import { ref } from 'vue'

export interface ImportResult {
  success: boolean
  message: string
  data?: any
  recordCount?: number
  errors?: string[]
}

export interface ImportPreview {
  module: string
  recordCount: number
  data: any[]
  meta?: {
    exportedAt: string
    version: string
  }
}

const isImporting = ref(false)
const importProgress = ref(0)

export const useImport = () => {
  /**
   * Simple CSV Parser
   */
  const parseCSV = (csv: string): any[] => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '')
    if (lines.length < 2) return []

    const parseLine = (line: string) => {
      const result = []
      let start = 0
      let inQuotes = false
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') inQuotes = !inQuotes
        if (!inQuotes && (line[i] === ',' || i === line.length - 1)) {
          let val = line.substring(start, i === line.length - 1 && line[i] !== ',' ? i + 1 : i)
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.substring(1, val.length - 1).replace(/""/g, '"')
          }
          result.push(val)
          start = i + 1
        }
      }
      return result
    }

    const headers = parseLine(lines[0])
    return lines.slice(1).map(line => {
      const values = parseLine(line)
      const obj: any = {}
      headers.forEach((header, i) => {
        let val = values[i]
        // Try to parse numbers
        if (val && !isNaN(val as any) && val.trim() !== '') {
          val = Number(val)
        }
        // Try to parse JSON strings (for nested categories/tags)
        if (typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) {
          try { val = JSON.parse(val) } catch (e) {}
        }
        obj[header] = val
      })
      return obj
    })
  }

  /**
   * Read and parse file based on extension
   */
  const readFile = async (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      const isCSV = file.name.endsWith('.csv')
      
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string
          if (isCSV) {
            resolve(parseCSV(content))
          } else {
            resolve(JSON.parse(content))
          }
        } catch (error) {
          reject(new Error(`Invalid ${isCSV ? 'CSV' : 'JSON'} file format`))
        }
      }
      
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
  }

  /**
   * Validate import file structure
   */
  const validateImportFile = (data: any, fileName: string): { valid: boolean; message: string; type: 'single' | 'full' | 'invalid' } => {
    const isCSV = fileName.endsWith('.csv')
    
    if (isCSV) {
      return { valid: Array.isArray(data), message: 'CSV data detected', type: 'single' }
    }

    // Check if it's a full backup
    if (data._meta?.type === 'full_backup' && data.data) {
      return { valid: true, message: 'Full backup detected', type: 'full' }
    }
    
    // Check if it's a single module export
    if (data._meta?.module && data.data) {
      return { valid: true, message: `${data._meta.module} export detected`, type: 'single' }
    }
    
    // Check if it's raw data array
    if (Array.isArray(data)) {
      return { valid: true, message: 'Raw data array detected', type: 'single' }
    }
    
    return { valid: false, message: 'Unrecognized file format', type: 'invalid' }
  }

  /**
   * Preview import without executing
   */
  const previewImport = async (file: File): Promise<ImportPreview | null> => {
    try {
      const data = await readFile(file)
      const validation = validateImportFile(data, file.name)
      
      if (!validation.valid) {
        return null
      }
      
      if (validation.type === 'full') {
        const modules = Object.keys(data.data)
        const totalRecords = modules.reduce((sum, key) => {
          return sum + (Array.isArray(data.data[key]) ? data.data[key].length : 1)
        }, 0)
        
        return {
          module: 'Full Backup',
          recordCount: totalRecords,
          data: data.data,
          meta: data._meta
        }
      } else {
        const records = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : [data])
        return {
          module: data._meta?.module || (file.name.includes('blog') ? 'blog' : file.name.includes('portfolio') ? 'portfolio' : 'Unknown'),
          recordCount: records.length,
          data: records,
          meta: data._meta
        }
      }
    } catch (error) {
      console.error('Preview failed:', error)
      return null
    }
  }

  /**
   * Execute import with callbacks
   */
  const executeImport = async (
    file: File,
    importHandler: (moduleName: string, data: any[]) => Promise<{ success: boolean; imported: number; errors?: string[] }>
  ): Promise<ImportResult> => {
    isImporting.value = true
    importProgress.value = 0
    
    try {
      const data = await readFile(file)
      const validation = validateImportFile(data, file.name)
      
      if (!validation.valid) {
        return { success: false, message: validation.message }
      }
      
      importProgress.value = 25
      
      let totalImported = 0
      let allErrors: string[] = []
      
      if (validation.type === 'full') {
        const modules = Object.keys(data.data)
        const progressPerModule = 75 / modules.length
        
        for (let i = 0; i < modules.length; i++) {
          const moduleName = modules[i]
          const moduleData = Array.isArray(data.data[moduleName]) 
            ? data.data[moduleName] 
            : [data.data[moduleName]]
          
          const result = await importHandler(moduleName, moduleData)
          
          if (result.success) {
            totalImported += result.imported
          }
          if (result.errors) {
            allErrors = [...allErrors, ...result.errors]
          }
          
          importProgress.value = 25 + (progressPerModule * (i + 1))
        }
      } else {
        const moduleName = data._meta?.module || (file.name.includes('blog') ? 'blog' : file.name.includes('portfolio') ? 'portfolio' : 'unknown')
        const records = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : [data])
        
        importProgress.value = 50
        
        const result = await importHandler(moduleName, records)
        totalImported = result.imported
        allErrors = result.errors || []
        
        importProgress.value = 100
      }
      
      return {
        success: true,
        message: `Successfully imported ${totalImported} records`,
        recordCount: totalImported,
        errors: allErrors.length > 0 ? allErrors : undefined
      }
    } catch (error) {
      console.error('Import failed:', error)
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Import failed'
      }
    } finally {
      isImporting.value = false
      setTimeout(() => {
        importProgress.value = 0
      }, 1000)
    }
  }

  /**
   * Trigger file picker
   */
  const selectFile = (): Promise<File | null> => {
    return new Promise((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.json,.csv'
      
      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0] || null
        resolve(file)
      }
      
      input.oncancel = () => resolve(null)
      input.click()
    })
  }

  return {
    isImporting,
    importProgress,
    readFile,
    validateImportFile,
    previewImport,
    executeImport,
    selectFile
  }
}
