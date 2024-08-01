   /** @type {import('next-sitemap').IConfig} */
   module.exports = {
    siteUrl: process.env.SITE_URL || 'https://dndai.app',
    generateRobotsTxt: true, // Generate robots.txt file
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    generateIndexSitemap: false,
    exclude: [
      '/auth/*',
      '/payment/*'
    ],
    additionalPaths: async (config) => [
      await config.transform(config, '/additional-page'),
    ],
    transform: async (config, path) => {
      return {
        loc: path, // The URL of the page
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    },
  }