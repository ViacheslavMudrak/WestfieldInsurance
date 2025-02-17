/**
 * @param {import('next').NextConfig} nextConfig
 */
const videoIndexSourcePlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    async rewrites() {
      return [
        ...(await nextConfig.rewrites()),
        // video index source route
        {
          source: '/api/video-index-source.xml',
          destination: '/api/video-index-source',
        },
      ];
    },
  });
};

module.exports = videoIndexSourcePlugin;
