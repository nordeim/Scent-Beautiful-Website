// components/common/Layout/Footer.tsx
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'
import { NewsletterForm } from '@/components/features/newsletter/NewsletterForm'

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  const shopLinks = [
    { href: '/products?category=essential-oils', label: 'Essential Oils' },
    { href: '/products?category=natural-soaps', label: 'Natural Soaps' },
    { href: '/products?category=gift-sets', label: 'Gift Sets' },
    { href: '/products?category=new-arrivals', label: 'New Arrivals' },
    { href: '/products?category=bestsellers', label: 'Bestsellers' },
  ]

  const helpLinks = [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQs' },
    { href: '/shipping-returns', label: 'Shipping & Returns' },
    { href: '/account/orders', label: 'Track Your Order' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
  ]

  return (
    <footer className="bg-stone-800 text-stone-300 border-t border-stone-700">
      <div className="container py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-stone-50">The Scent</h3>
            <p className="text-sm text-stone-400">
              Creating premium aromatherapy products to enhance mental and physical well-being
              through the power of nature.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} aria-label={social.label} className="text-stone-400 hover:text-stone-50 transition-colors">
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop & Help Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-stone-50">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-stone-400 hover:text-stone-50 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-stone-50">Help</h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-stone-400 hover:text-stone-50 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-stone-50">Stay Connected</h3>
            <p className="text-sm text-stone-400">
              Join our newsletter for exclusive offers, new products, and wellness tips.
            </p>
            <NewsletterForm />
            
            {/* Contact Info Block - RESTORED */}
            <div className="pt-4 mt-4 border-t border-stone-700/50">
              <ul className="space-y-2 text-sm text-stone-400">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>123 Aromatherapy Lane, Wellness City, WB 12345</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>hello@thescent.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-stone-700/50">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm md:flex-row">
          <p className="text-stone-500">&copy; {new Date().getFullYear()} The Scent. All Rights Reserved.</p>
          <div className="flex items-center gap-3 text-stone-500">
            <span>Accepted Payments:</span>
            <img src="/payment-icons/mastercard.svg" alt="Mastercard" className="h-6 opacity-60" />
            <img src="/payment-icons/paypal.svg" alt="PayPal" className="h-5 opacity-60" />
            <img src="/payment-icons/amex.svg" alt="American Express" className="h-6 opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  )
}
