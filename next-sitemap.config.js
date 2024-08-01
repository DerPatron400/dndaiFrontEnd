module.exports = {
    siteUrl: 'https://www.dndai.app', // Replace with your website URL
    generateRobotsTxt: true, // Generate robots.txt file
    sitemapSize: 5000, // Limit the number of URLs per sitemap file
    changefreq: 'weekly', // Change frequency of the URLs
    priority: 0.7, // Priority of the URLs
    exclude: ['/api/*', '/auth/*'], // Exclude specific paths
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/auth/'],
        },
      ],
      additionalSitemaps: [
        'https://www.dndai.app/sitemap.xml', // Additional sitemaps
      ],
    },
  };