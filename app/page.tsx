// app/page.tsx
import { Button } from '@/components/common/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import Link from 'next/link'
import { FeaturedProducts } from '@/components/features/home/FeaturedProducts'
import { appRouter } from '@/server/routers'
import { createContext } from '@/server/context'

// This page will be re-rendered on-demand, but the data can be cached.
export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  // Create a server-side caller for tRPC
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  const featuredProducts = await caller.product.getFeatured({ limit: 3 })

  return (
    <>
      <div className="relative w-full overflow-hidden bg-background">
        <div className="container relative z-10 flex min-h-[calc(100vh-5rem)] items-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <FadeIn delay={0.2} duration={0.8}>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                A Digital Sanctuary for the Senses
              </h1>
            </FadeIn>

            <FadeIn delay={0.4} duration={0.8}>
              <p className="mt-6 max-w-xl text-lg text-foreground/80">
                Explore our collection of premium, natural aromatherapy products designed to
                transform your space and elevate your well-being.
              </p>
            </FadeIn>

            <FadeIn delay={0.6} duration={0.8}>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="px-8 py-6 text-base">
                  <Link href="/products">Explore The Collection</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="px-8 py-6 text-base">
                  <Link href="/journal">Read Our Journal</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Render the new Featured Products section */}
      <FeaturedProducts products={featuredProducts} />
    </>
  )
}
