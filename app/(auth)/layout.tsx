// app/(auth)/layout.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full">
      <div className="container relative grid flex-1 grid-cols-1 lg:grid-cols-2">
        {/* Left side - Image */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-charcoal" />
          <Image
            src="/images/auth-background.jpg" // Add a suitable image here
            alt="Aromatherapy setup"
            fill
            className="object-cover opacity-30"
          />
          <Link href="/" className="relative z-20 flex items-center text-lg font-medium">
            The Scent
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This platform is a true sanctuary for the senses. The attention to detail is unmatched.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="lg:p-8 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}
