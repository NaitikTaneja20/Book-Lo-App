import type { SiteSettings } from './types';

// In a real app, you would use a database.
// For this example, we use an in-memory object.
let settings: SiteSettings = {
  shippingCost: 50, // in Rupees
  gstRate: 0.18, // 18%
  isGstEnabled: true,
};

export const getSettings = async (): Promise<SiteSettings> => {
  // In a real app, you'd fetch this from a DB.
  return settings;
};

export const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    settings = { ...settings, ...newSettings };
    return settings;
};
