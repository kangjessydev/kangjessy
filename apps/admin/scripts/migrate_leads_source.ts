import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrate() {
  console.log('--- Starting Leads Source Migration ---')
  
  // 1. Update web_consultation_wait -> Konsultasi Proposal
  console.log('Updating "web_consultation_wait" to "Konsultasi Proposal"...')
  const { data: waitData, error: waitError } = await supabase
    .from('clients')
    .update({ source: 'Konsultasi Proposal' })
    .eq('source', 'web_consultation_wait')
    .select()

  if (waitError) {
    console.error('Error updating wait leads:', waitError)
  } else {
    console.log(`Successfully updated ${waitData?.length || 0} leads.`)
  }

  // 2. Update web_consultation_instant -> Konsultasi WhatsApp
  console.log('Updating "web_consultation_instant" to "Konsultasi WhatsApp"...')
  const { data: instantData, error: instantError } = await supabase
    .from('clients')
    .update({ source: 'Konsultasi WhatsApp' })
    .eq('source', 'web_consultation_instant')
    .select()

  if (instantError) {
    console.error('Error updating instant leads:', instantError)
  } else {
    console.log(`Successfully updated ${instantData?.length || 0} leads.`)
  }

  console.log('--- Migration Finished ---')
}

migrate()
