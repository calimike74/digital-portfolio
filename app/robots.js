export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://lehnert-consulting.vercel.app/sitemap.xml',
  };
}
