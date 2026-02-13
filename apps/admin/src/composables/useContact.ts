import { ref } from 'vue'
import { systemSettingsService } from '../services/systemSettingsService'

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface ContactSettings {
  whatsapp: string
  whatsappMsg: string
  email: string
  location: string
  socials: SocialLink[]
}

const STORAGE_KEY = 'kgj_contact_settings'
const DB_KEY = 'contact_info'

const defaultContact: ContactSettings = {
  whatsapp: '6288218705236',
  whatsappMsg: 'Halo KangJessy, saya ingin konsultasi mengenai project saya...',
  email: 'hi.kangjessy@gmail.com',
  location: 'Bandung, Indonesia',
  socials: [
    { name: 'Youtube', url: 'https://youtube.com/@kangjessy', icon: 'Youtube' },
    { name: 'Github', url: 'https://github.com/kangjessy', icon: 'Github' },
    { name: 'Instagram', url: 'https://instagram.com/kangjessy', icon: 'Instagram' },
    { name: 'Linkedin', url: 'https://linkedin.com/in/kangjessy', icon: 'Linkedin' },
    { name: 'Thread', url: 'https://threads.net/@kangjessy', icon: 'Hash' }
  ]
}

const contact = ref<ContactSettings>({ ...defaultContact })

// Load initial state from LocalStorage
const stored = localStorage.getItem(STORAGE_KEY)
if (stored) {
  try {
    const parsed = JSON.parse(stored)
    contact.value = { ...defaultContact, ...parsed }
  } catch (e) {
    console.error('Failed to parse contact settings', e)
  }
}

export const useContact = () => {
  const initContact = async () => {
    try {
      const dbValue = await systemSettingsService.getByKey(DB_KEY)
      if (dbValue) {
        contact.value = { ...defaultContact, ...dbValue }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contact.value))
      }
    } catch (e) {
      console.error('Failed to init contact from DB', e)
    }
  }

  const saveContact = async (settings: ContactSettings) => {
    contact.value = { ...settings }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contact.value))
    
    try {
      await systemSettingsService.set(DB_KEY, contact.value)
    } catch (e) {
      console.error('Failed to sync contact to DB', e)
      throw e
    }
  }

  const addSocial = () => {
    contact.value.socials.push({ name: '', url: '', icon: 'ExternalLink' })
  }

  const removeSocial = (index: number) => {
    contact.value.socials.splice(index, 1)
  }

  return {
    contact,
    initContact,
    saveContact,
    addSocial,
    removeSocial
  }
}
