/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/admin/:path*', // Blokuje vše pod /admin
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive'
          },
          {
            key: 'Cache-Control',
            value: 'no-store'
          }
        ]
      },
      {
        source: '/api/:path*', // Blokuje i API routes
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow'
          }
        ]
      }
    ]
  }
}

export default nextConfig