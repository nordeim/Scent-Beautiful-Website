// app/page.tsx
import { Button } from '@/components/common/Button'
import Link from 'next/link'

export default function Home() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          A Digital Sanctuary for the Senses.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Explore our collection of premium, natural aromatherapy products designed to transform
          your space and elevate your well-being.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/products">
          <Button>Explore Collection</Button>
        </Link>
        <Link href="/journal">
          <Button variant="secondary">Read our Journal</Button>
        </Link>
      </div>
    </section>
  )
}
