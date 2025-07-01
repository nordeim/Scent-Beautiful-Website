// app/page.tsx
import { FeaturedProducts } from '@/components/features/home/FeaturedProducts'
import { HeroSection } from '@/components/features/home/HeroSection'
import { appRouter } from '@/server/routers'
import { createContext } from '@/server/context'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  // Ensure we fetch 4 products for the new dynamic layout
  const featuredProducts = await caller.product.getFeatured({ limit: 4 })

  return (
    <div>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
    </div>
  )
}
