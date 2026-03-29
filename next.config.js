/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Note: eslint config is now handled via eslint.config.js
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
}

module.exports = nextConfig