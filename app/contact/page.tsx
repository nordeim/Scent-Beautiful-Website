// app/contact/page.tsx
import type { Metadata } from 'next'
import { Mail, Phone, MapPin } from 'lucide-react'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Scent team. We are here to help with any questions or inquiries.',
}

export default function ContactPage() {
  return (
    <div className="container my-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We would love to hear from you. Whether you have a question about our products, an order, or anything else, our team is ready to answer all your questions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <Mail className="h-10 w-10 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Email Us</h2>
          <p className="text-muted-foreground mb-4">The quickest way to get a response.</p>
          <a href="mailto:hello@thescent.com" className="font-semibold text-primary hover:underline">
            hello@thescent.com
          </a>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <Phone className="h-10 w-10 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Call Us</h2>
          <p className="text-muted-foreground mb-4">Mon-Fri, 9am - 5pm EST.</p>
          <a href="tel:+15551234567" className="font-semibold text-primary hover:underline">
            +1 (555) 123-4567
          </a>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <MapPin className="h-10 w-10 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
          <p className="text-muted-foreground">
            123 Aromatherapy Lane,
            <br />
            Wellness City, WB 12345
          </p>
        </div>
      </div>
    </div>
  )
}
