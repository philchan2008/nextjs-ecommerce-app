/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    env: {
        //NEXT_PUBLIC_SITE_URL: 'https://api.example.com', //See .env.local
    },
    // experimental: {
    //     middleware: true,
    // },
    // // Optional: restrict middleware to specific paths
    // matcher: ['/fetchtest'],
};


export default nextConfig;
