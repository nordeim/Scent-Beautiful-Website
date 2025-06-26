// app/sitemap.ts
import { MetadataRoute } from 'next'
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)

  // Fetch products
  const products = await caller.product.list({ limit: 100 }) // Adjust limit as needed

  const productUrls = products.items.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Static pages
  const staticUrls = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${siteUrl}/products`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  return [...staticUrls, ...productUrls]
}
