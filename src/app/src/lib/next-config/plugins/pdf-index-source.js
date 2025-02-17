/**
 * @param {import('next').NextConfig} nextConfig
 */
const pdfIndexSourcePlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    async rewrites() {
      return [
        ...(await nextConfig.rewrites()),
        // pdf index source route
        {
          source: '/api/pdf-index-source.xml',
          destination: '/api/pdf-index-source',
        },
      ];
    },
  });
};

module.exports = pdfIndexSourcePlugin;
