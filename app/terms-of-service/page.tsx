// app/terms-of-service/page.tsx
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Please read our terms and conditions carefully before using our service.',
}

export default function TermsOfServicePage() {
  return (
    <div className="container my-16">
      <div className="prose dark:prose-invert mx-auto max-w-3xl">
        <h1>Terms of Service</h1>
        <p>Last updated: June 28, 2024</p>
        <p>
          Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the https://thescent.com website (the "Service") operated by The Scent ("us", "we", or "our").
        </p>

        <h2>Accounts</h2>
        <p>
          When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>
        
        <h2>Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property of The Scent and its licensors.
        </p>

        <h2>Links To Other Web Sites</h2>
        <p>
          Our Service may contain links to third-party web sites or services that are not owned or controlled by The Scent. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
        </p>
      </div>
    </div>
  )
}
