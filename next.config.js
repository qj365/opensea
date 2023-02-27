/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'opensea.io',
            'i.seadn.io',
            'storage.googleapis.com',
            'firebasestorage.googleapis.com',
        ],
    },
};

module.exports = nextConfig;
