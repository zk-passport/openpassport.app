/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'map.proofofpassport.com',
            },
          ],
          destination: '/map/:path*',
        },
      ],
      // afterFiles: [
      //     {
      //         source: '/map/_next/:path*',
      //         destination: '/_next/:path*',
      //     },
      //     {
      //         source: '/map/static/:path*',
      //         destination: '/static/:path*',
      //     },
      //     {
      //         source: '/map/data/:path*',
      //         destination: '/data/:path*',
      //     },
      //     {
      //         source: '/map/favicon.ico',
      //         destination: '/favicon.ico',
      //     },
      // ],
    };
  },
};

module.exports = nextConfig;