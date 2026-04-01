import { ref } from 'vue'
import { siteConfig as staticConfig } from '../data/config/siteConfig'
import { systemSettingsService } from '../services/systemSettingsService'

export interface SiteSettings {
  name: string
  logo: string
  whatsapp: string
  whatsappMsg: string
  email: string
  location: string
  socialLinks: { name: string, url: string, icon: string }[]
  marketingStats: {
    projects: number
    support: number
    experience: number
  }
}

const siteSettings = ref<SiteSettings>({
  name: staticConfig.name,
  logo: '/logo.png', // Default logo
  whatsapp: staticConfig.whatsapp.number,
  whatsappMsg: staticConfig.whatsapp.defaultMessage,
  email: staticConfig.socials.email,
  location: 'Bandung, Indonesia',
  socialLinks: staticConfig.socialLinks,
  marketingStats: {
    projects: staticConfig.heroStats.projects,
    support: staticConfig.heroStats.support,
    experience: staticConfig.heroStats.experience
  }
})

export const useSiteSettings = () => {
  const isLoaded = ref(false)

  const fetchSettings = async () => {
    try {
      // Fetch Contact Info
      const contactInfo = await systemSettingsService.getByKey('contact_info')
      if (contactInfo) {
        siteSettings.value.whatsapp = contactInfo.whatsapp || siteSettings.value.whatsapp
        siteSettings.value.whatsappMsg = contactInfo.whatsappMsg || siteSettings.value.whatsappMsg
        siteSettings.value.email = contactInfo.email || siteSettings.value.email
        siteSettings.value.location = contactInfo.location || siteSettings.value.location
        if (contactInfo.socials && contactInfo.socials.length > 0) {
          siteSettings.value.socialLinks = contactInfo.socials
        }
      }

      // Fetch Branding
      const branding = await systemSettingsService.getByKey('branding')
      if (branding) {
        siteSettings.value.name = branding.name || siteSettings.value.name
        siteSettings.value.logo = branding.logo || siteSettings.value.logo
      }

      // Fetch Marketing Stats
      const marketingStats = await systemSettingsService.getByKey('marketing_stats')
      if (marketingStats) {
        siteSettings.value.marketingStats.projects = marketingStats.projects || siteSettings.value.marketingStats.projects
        siteSettings.value.marketingStats.support = marketingStats.support || siteSettings.value.marketingStats.support
        siteSettings.value.marketingStats.experience = marketingStats.experience || siteSettings.value.marketingStats.experience
      }

      isLoaded.value = true
    } catch (e) {
      console.error('Failed to load site settings:', e)
    }
  }

  return {
    settings: siteSettings,
    isLoaded,
    fetchSettings
  }
}
