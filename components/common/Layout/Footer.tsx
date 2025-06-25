// components/common/Layout/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <p className="text-balance text-center text-sm leading-loose text-foreground/60 md:text-left">
          &copy; {new Date().getFullYear()} The Scent. All Rights Reserved.
        </p>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/terms"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
