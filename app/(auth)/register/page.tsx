// app/(auth)/register/page.tsx
import { AuthForm } from '@/components/features/auth/AuthForm'

export const metadata = {
  title: 'Create Account',
  description: 'Create a new account with The Scent.',
}

export default function RegisterPage() {
  return <AuthForm defaultTab="register" />
}
