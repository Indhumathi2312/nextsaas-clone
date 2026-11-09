/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/index.html',
        destination: '/',
      },
      {
        source: '/start.html',
        destination: '/',
      },
      {
        source: '/ai-marketing-agency-one-page',
        destination: '/',
      },
      {
        source: '/ai-marketing-agency-one-page/:path*',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
