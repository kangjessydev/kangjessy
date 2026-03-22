export const systemSettingsService = {
  async getByKey(key: string): Promise<any | null> {
    console.warn('systemSettingsService called in hardcoded mode. Returning dummy data for key:', key);
    if (key === 'maintenance_mode') return false;
    return null;
  }
}
