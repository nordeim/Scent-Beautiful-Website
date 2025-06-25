// components/common/Layout/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} The Scent. All Rights Reserved.
        </p>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground sm:gap-6">
          <Link href="/terms">Terms of Service</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  )
}
