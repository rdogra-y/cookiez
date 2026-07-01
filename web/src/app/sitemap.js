import { demoProducts } from '@/lib/demoData'

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const now = new Date()
  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/subscription`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/corporate`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...demoProducts.map((product) => ({
      url: `${baseUrl}/shop/${product.shopifyHandle}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ]
}
