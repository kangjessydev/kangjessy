import { useSiteSettings } from './useSiteSettings'

export function useWhatsApp() {
  const { settings } = useSiteSettings()

  const openDirectChat = (message?: string) => {
    // Default message if none provided
    const text = message || settings.value.whatsappMsg || "Halo Kang Jessy, saya tertarik dengan layanan website. Boleh konsultasi?"
    
    // Clean up number (remove non-digits)
    let number = settings.value.whatsapp.replace(/\D/g, '')
    
    // Convert leading 0 to 62 (Indonesian country code) for wa.me compatibility
    if (number.startsWith('0')) {
      number = '62' + number.slice(1)
    }
    
    const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(text)}`
    window.open(waUrl, '_blank')
  }

  return {
    openDirectChat
  }
}
