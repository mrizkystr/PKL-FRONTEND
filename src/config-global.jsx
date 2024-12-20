export const config = {
        HOST_API: import.meta.env.VITE_HOST_API || 'http://127.0.0.1:8000',
    JWT_SECRET: import.meta.env.VITE_JWT_SECRET_KEY,
    FIREBASE: {
        API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
        AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
        VAPID_KEY: import.meta.env.VITE_FIREBASE_VAPID_KEY
    }
};

// Untuk backward compatibility dengan kode yang sudah ada
export const HOST_API = config.HOST_API;

export default config;