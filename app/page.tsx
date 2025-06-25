// app/page.tsx
import { Button } from '@/components/common/Button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container flex h-[calc(100vh-8rem)] items-center justify-center">
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 text-center md:py-12">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
          A Digital Sanctuary for the Senses.
        </h1>
        <p className="max-w-[700px] text-lg text-foreground/80">
          Explore our collection of premium, natural aromatherapy products designed to transform
          your space and elevate your well-being.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/products">
            <Button size="lg">Explore Collection</Button>
          </Link>
          <Link href="/journal">
            <Button size="lg" variant="secondary">
              Read our Journal
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
