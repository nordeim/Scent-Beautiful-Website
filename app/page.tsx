// app/page.tsx
import { Button } from '@/components/common/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import Link from 'next/link'

export default function Home() {
  return (
    // The main container with a subtle background texture or image.
    // For now, we use a gradient to simulate depth.
    // In a real implementation, a high-quality image would be used:
    // style={{ backgroundImage: 'url(/hero-background.jpg)' }}
    <div className="relative w-full overflow-hidden bg-limestone dark:bg-charcoal">
      <div className="container relative z-10 flex min-h-[calc(100vh-4rem)] items-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <FadeIn delay={0.2} duration={0.8}>
            <h1 className="text-4xl font-extrabold tracking-tighter text-charcoal dark:text-pearl sm:text-5xl md:text-6xl lg:text-7xl">
              A Digital Sanctuary for the Senses
            </h1>
          </FadeIn>

          <FadeIn delay={0.4} duration={0.8}>
            <p className="mt-6 max-w-xl text-lg text-charcoal/80 dark:text-pearl/80">
              Explore our collection of premium, natural aromatherapy products designed to
              transform your space and elevate your well-being.
            </p>
          </FadeIn>

          <FadeIn delay={0.6} duration={0.8}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="px-8 py-6 text-base">
                  Explore The Collection
                </Button>
              </Link>
              <Link href="/journal">
                <Button size="lg" variant="secondary" className="px-8 py-6 text-base">
                  Read Our Journal
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Optional: Add subtle decorative elements */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/50 to-transparent dark:from-black/50"
        aria-hidden="true"
      />
    </div>
  )
}
