export const isDev = () => process.env.NODE_ENV !== 'production';
export const isBrowser = () => typeof window !== 'undefined';
export const isServer = () => typeof window === 'undefined';
