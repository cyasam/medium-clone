/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === 'production',
  images: {
    domains: ['rmnubkfkuodwrvidhqfr.supabase.co'],
  },
};

module.exports = nextConfig;
