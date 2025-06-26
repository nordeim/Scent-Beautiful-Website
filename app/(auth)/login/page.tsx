// app/(auth)/login/page.tsx
import { AuthForm } from '@/components/features/auth/AuthForm'

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your The Scent account.',
}

export default function LoginPage() {
  return <AuthForm defaultTab="login" />
}
