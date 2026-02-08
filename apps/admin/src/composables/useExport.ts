import { ref } from 'vue'

export type ExportFormat = 'json' | 'csv'
export type ExportModule = 'blog' | 'portfolio' | 'orders' | 'leads' | 'finance' | 'vouchers' | 'all'

interface ExportOptions {
  filename?: string
  format?: ExportFormat
  includeMetadata?: boolean
}

const isExporting = ref(false)
const exportProgress = ref(0)

export const useExport = () => {
  /**
   * Convert data to JSON string
   */
  const toJSON = (data: any, pretty = true): string => {
    return JSON.stringify(data, null, pretty ? 2 : 0)
  }

  /**
   * Convert array of objects to CSV string
   */
  const toCSV = (data: any[]): string => {
    if (!data.length) return ''
    
    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header]
          // Handle strings with commas, quotes, or newlines
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`
          }
          // Handle objects/arrays
          if (typeof value === 'object' && value !== null) {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`
          }
          return value ?? ''
        }).join(',')
      )
    ]
    return csvRows.join('\n')
  }

  /**
   * Download file to user's computer
   */
  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  /**
   * Export data to file
   */
  const exportData = async (
    data: any,
    moduleName: string,
    options: ExportOptions = {}
  ) => {
    const {
      format = 'json',
      filename = `${moduleName}_export_${new Date().toISOString().split('T')[0]}`,
      includeMetadata = true
    } = options

    isExporting.value = true
    exportProgress.value = 0

    try {
      let exportData = data
      
      // Add metadata wrapper if enabled
      if (includeMetadata) {
        exportData = {
          _meta: {
            exportedAt: new Date().toISOString(),
            module: moduleName,
            totalRecords: Array.isArray(data) ? data.length : 1,
            format,
            version: '1.0.0'
          },
          data: data
        }
      }

      exportProgress.value = 50

      let content: string
      let mimeType: string
      let extension: string

      if (format === 'csv') {
        // For CSV, we only export the data array without metadata
        content = toCSV(Array.isArray(data) ? data : [data])
        mimeType = 'text/csv;charset=utf-8;'
        extension = 'csv'
      } else {
        content = toJSON(exportData)
        mimeType = 'application/json'
        extension = 'json'
      }

      exportProgress.value = 75

      downloadFile(content, `${filename}.${extension}`, mimeType)

      exportProgress.value = 100
      
      return { success: true, filename: `${filename}.${extension}` }
    } catch (error) {
      console.error('Export failed:', error)
      return { success: false, error }
    } finally {
      isExporting.value = false
      setTimeout(() => {
        exportProgress.value = 0
      }, 1000)
    }
  }

  /**
   * Export multiple modules at once (full backup)
   */
  const exportFullBackup = async (
    dataMap: Record<string, any>,
    options: ExportOptions = {}
  ) => {
    const {
      filename = `full_backup_${new Date().toISOString().split('T')[0]}`
    } = options

    isExporting.value = true
    exportProgress.value = 0

    try {
      const backup = {
        _meta: {
          exportedAt: new Date().toISOString(),
          type: 'full_backup',
          modules: Object.keys(dataMap),
          version: '1.0.0'
        },
        data: dataMap
      }

      exportProgress.value = 75

      const content = toJSON(backup)
      downloadFile(content, `${filename}.json`, 'application/json')

      exportProgress.value = 100

      return { success: true, filename: `${filename}.json` }
    } catch (error) {
      console.error('Full backup failed:', error)
      return { success: false, error }
    } finally {
      isExporting.value = false
      setTimeout(() => {
        exportProgress.value = 0
      }, 1000)
    }
  }

  return {
    isExporting,
    exportProgress,
    exportData,
    exportFullBackup,
    toJSON,
    toCSV
  }
}
