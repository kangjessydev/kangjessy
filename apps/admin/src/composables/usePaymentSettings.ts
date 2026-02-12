import { ref, computed } from 'vue'
import { systemSettingsService } from '../services/systemSettingsService'

export interface BankAccount {
  bank_name: string
  account_number: string
  account_holder: string
  bank_logo: string
  is_active: boolean
}

const STORAGE_KEY = 'kgj_payment_settings'
const DB_KEY = 'payment_methods'

const bankAccounts = ref<BankAccount[]>([
  {
    bank_name: "",
    account_number: "",
    account_holder: "",
    bank_logo: "",
    is_active: true,
  }
])

// Load initial state from LocalStorage for immediate UI
const stored = localStorage.getItem(STORAGE_KEY)
if (stored) {
  try {
    const data = JSON.parse(stored)
    if (Array.isArray(data)) {
      bankAccounts.value = data.map((acc: any) => ({
        ...acc,
        is_active: acc.is_active ?? true,
      }))
    } else if (data.bank_name) {
      // Legacy single object format
      bankAccounts.value = [
        {
          ...data,
          bank_logo: data.bank_logo || "",
          is_active: data.is_active ?? true,
        }
      ]
    }
  } catch (e) {
    console.error('Failed to parse payment settings', e)
  }
}

export const usePaymentSettings = () => {
  const activeBanks = computed(() => 
    bankAccounts.value.filter(acc => acc.is_active !== false)
  )

  const initPaymentSettings = async () => {
    try {
      const dbValue = await systemSettingsService.getByKey(DB_KEY)
      if (dbValue && Array.isArray(dbValue)) {
        bankAccounts.value = [...dbValue]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bankAccounts.value))
      }
    } catch (e) {
      console.error('Failed to init payment settings from DB', e)
    }
  }

  const saveBankAccounts = async (accounts: BankAccount[]) => {
    bankAccounts.value = [...accounts]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bankAccounts.value))

    try {
      await systemSettingsService.set(DB_KEY, bankAccounts.value)
    } catch (e) {
      console.error('Failed to sync payment settings to DB', e)
    }
  }

  const addAccount = () => {
    bankAccounts.value.push({
      bank_name: "",
      account_number: "",
      account_holder: "",
      bank_logo: "",
      is_active: true,
    })
  }

  const removeAccount = (index: number) => {
    bankAccounts.value.splice(index, 1)
  }

  const getBankLogo = (name: string, manual?: string) => {
    if (manual && manual.trim()) return manual;
    if (!name) return "";
    const bank = name.toLowerCase();
    if (bank.includes("bca"))
      return "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg";
    if (bank.includes("mandiri"))
      return "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg";
    if (bank.includes("bni"))
      return "https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg";
    if (bank.includes("bri"))
      return "https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_Logo.svg";
    if (bank.includes("permata"))
      return "https://upload.wikimedia.org/wikipedia/commons/1/18/Logo_PermataBank.svg";
    if (bank.includes("cimb") || bank.includes("niaga"))
      return "https://upload.wikimedia.org/wikipedia/commons/6/66/CIMB_Niaga_Logo.svg";
    if (bank.includes("jenius") || bank.includes("btpn"))
      return "https://upload.wikimedia.org/wikipedia/commons/b/ba/Jenius-logo.png";
    return "";
  };

  return {
    bankAccounts,
    activeBanks,
    initPaymentSettings,
    saveBankAccounts,
    addAccount,
    removeAccount,
    getBankLogo
  }
}
