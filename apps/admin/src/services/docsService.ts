import { supabase } from '@kangjessy/database'

export interface DocLink {
  id: string
  project_type: string
  proposal_link: string
  contract_link: string
}

// Migration mapping: old names -> new names
const projectTypeNameMigration: Record<string, string> = {
  'Landing Page': 'Starter Landing Page',
  'Company Profile': 'Premium Company Profile',
  'E-Commerce': 'Ecommerce Ecosystem', // Not in contact form, but exists in order config
  'Custom Web App': 'Belum Tahu / Custom Request'
}

function migrateProjectTypeName(oldName: string): string {
  return projectTypeNameMigration[oldName] || oldName
}

export const docsService = {
  async getLinks() {
    // Expected project types (sama dengan contact form)
    const expectedTypes = [
      'Starter Landing Page',
      'Premium Company Profile',
      'Custom CRM System',
      'LMS Academy',
      'Intelligent Chatbot AI',
      'Workflow Automation',
      'Belum Tahu / Custom Request'
    ]
    
    const getDefaultLinks = (): DocLink[] => [
      { id: '1', project_type: 'Starter Landing Page', proposal_link: '', contract_link: '' },
      { id: '2', project_type: 'Premium Company Profile', proposal_link: '', contract_link: '' },
      { id: '3', project_type: 'Custom CRM System', proposal_link: '', contract_link: '' },
      { id: '4', project_type: 'LMS Academy', proposal_link: '', contract_link: '' },
      { id: '5', project_type: 'Intelligent Chatbot AI', proposal_link: '', contract_link: '' },
      { id: '6', project_type: 'Workflow Automation', proposal_link: '', contract_link: '' },
      { id: '7', project_type: 'Belum Tahu / Custom Request', proposal_link: '', contract_link: '' }
    ]
    
    try {
      const { data, error } = await supabase
        .from('document_settings')
        .select('*')
      
      if (error) throw error
      
      // Migrate old project_type names to new ones
      let migrated = data.map(doc => ({
        ...doc,
        project_type: migrateProjectTypeName(doc.project_type)
      }))
      
      // Validate: if structure doesn't match expected, reset to defaults
      const currentTypes = migrated.map(d => d.project_type)
      const isValid = expectedTypes.every(type => currentTypes.includes(type)) && 
                     migrated.length === expectedTypes.length
      
      if (!isValid) {
        console.log('[DocsService] Old structure detected, resetting to new defaults')
        return getDefaultLinks()
      }
      
      return migrated as DocLink[]
    } catch (e) {
      // Fallback to localStorage if table doesn't exist or other errors
      const local = localStorage.getItem('kgj_doc_links')
      if (local) {
        const parsed = JSON.parse(local) as DocLink[]
        // Migrate old names
        let migrated = parsed.map(doc => ({
          ...doc,
          project_type: migrateProjectTypeName(doc.project_type)
        }))
        
        // Validate localStorage data
        const currentTypes = migrated.map(d => d.project_type)
        const isValid = expectedTypes.every(type => currentTypes.includes(type)) && 
                       migrated.length === expectedTypes.length
        
        if (!isValid) {
          console.log('[DocsService] Old localStorage structure, resetting to defaults')
          // Clear old data and return new defaults
          localStorage.removeItem('kgj_doc_links')
          return getDefaultLinks()
        }
        
        return migrated
      }
      
      // No data found, return defaults
      return getDefaultLinks()
    }
  },

  async saveLinks(links: DocLink[]) {
    try {
      // Try to save to Supabase first if table exists
      for (const link of links) {
        await supabase
          .from('document_settings')
          .upsert(link)
      }
    } catch (e) {
      console.warn('Supabase save failed, saving to localStorage:', e)
    }
    
    // Always save to localStorage as fallback
    localStorage.setItem('kgj_doc_links', JSON.stringify(links))
  }
}
