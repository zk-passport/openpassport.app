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
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'blog.proofofpassport.com',
            },
          ],
          destination: '/blog/:path*',
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'map.openpassport.app',
            },
          ],
          destination: '/map/:path*',
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'blog.openpassport.app',
            },
          ],
          destination: '/blog/:path*',
        },
      ],
      afterFiles: [
          {
              source: '/map/_next/:path*',
              destination: '/_next/:path*',
          },
          {
              source: '/map/static/:path*',
              destination: '/static/:path*',
          },
          {
              source: '/map/data/:path*',
              destination: '/data/:path*',
          },
          {
              source: '/map/illustrations/:path*',
              destination: '/illustrations/:path*',
          },
          {
              source: '/map/images/:path*',
              destination: '/images/:path*',
          },
          {
              source: '/map/pattern/:path*',
              destination: '/pattern/:path*',
          },
          {
              source: '/map/icon.svg',
              destination: '/icon.svg',
          },
          {
              source: '/blog/_next/:path*',
              destination: '/_next/:path*',
          },
          {
              source: '/blog/static/:path*',
              destination: '/static/:path*',
          },
          {
              source: '/blog/data/:path*',
              destination: '/data/:path*',
          },
          {
              source: '/blog/illustrations/:path*',
              destination: '/illustrations/:path*',
          },
          {
              source: '/blog/images/:path*',
              destination: '/images/:path*',
          },
          {
              source: '/blog/pattern/:path*',
              destination: '/pattern/:path*',
          },
          {
              source: '/blog/icon.svg',
              destination: '/icon.svg',
          },
          {
              source: '/blog/open-graph.jpg',
              destination: '/open-graph.jpg',
          },
          {
              source: '/blog/introducing-op.jpg',
              destination: '/introducing-op.jpg',
          },
          {
              source: '/blog/nap.jpg',
              destination: '/nap.jpg',
          },
          {
              source: '/blog/playground.jpg',
              destination: '/playground.jpg',
          },
      ],
    };
  },
};

export default nextConfig;