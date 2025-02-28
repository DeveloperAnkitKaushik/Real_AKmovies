export default function robots() {
    return {
      rules: [
        {
          userAgent: '*', // Allow all search engines
          allow: '/', // Allow indexing of all public pages
        },
        {
          userAgent: 'Googlebot', // Specific rules for Googlebot
          allow: '/',
        },
        {
          userAgent: 'Bingbot', // Specific rules for Bingbot
          allow: '/',
        },
      ],
      sitemap: 'https://realakmovies.vercel.app/sitemap.xml',
      host: 'https://realakmovies.vercel.app',
    };
  }
  