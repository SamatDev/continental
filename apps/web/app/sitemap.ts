import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://continental.systems'
  const routes = ['', '/services', '/portfolio', '/about', '/contact']

  return routes.flatMap((route) => [
    {
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          ru: `${base}${route}`,
          en: `${base}/en${route}`,
        },
      },
    },
  ])
}
