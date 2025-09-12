export const isDemoMode = () => {
  return process.env.NEXT_PUBLIC_DEMO_MODE === '1';
};

export const getBrandName = () => {
  return process.env.NEXT_PUBLIC_BRAND_NAME || 'Hays County Jail Dashboard';
};