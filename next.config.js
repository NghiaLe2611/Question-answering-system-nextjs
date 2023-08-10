/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
    images: {
        domains: ['images.unsplash.com', 'i.ibb.co', 'scontent.fotp8-1.fna.fbcdn.net'],
        // Make ENV
        unoptimized: true
    },
    env: {
        // API_URL: 'http://192.168.6.145:5000',
        API_URL: 'http://127.0.0.1:9797',
        FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        SECRECT_KEY: process.env.NEXT_PUBLIC_SECRECT_KEY
    }
};

module.exports = nextConfig;
