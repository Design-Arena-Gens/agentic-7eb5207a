/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["agentic-7eb5207a.vercel.app", "localhost:3000"]
    }
  }
};

module.exports = nextConfig;
