// components/features/auth/AuthForm.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { TLoginSchema, TRegisterSchema, loginSchema, registerSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Button } from '@/components/common/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tabs'
import { Chrome } from 'lucide-react' // Using Chrome as a generic "Google" icon

interface AuthFormProps {
  defaultTab: 'login' | 'register'
}

export function AuthForm({ defaultTab }: AuthFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(defaultTab)

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    setError: setLoginError,
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) })

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
    reset: resetRegisterForm,
  } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) })

  const registerUser = api.user.register.useMutation({
    onSuccess: () => {
      // On successful registration, switch to login tab and show a success message
      setActiveTab('login')
      resetRegisterForm()
      // Can add a toast notification here in the future
    },
    onError: (error) => {
      // Handle errors, e.g., user already exists
      console.error('Registration failed:', error.message)
    },
  })

  const onLoginSubmit = async (data: TLoginSchema) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (result?.error) {
      setLoginError('root', { message: 'Invalid email or password.' })
    } else {
      router.push('/account/profile') // Redirect to a protected page on success
      router.refresh()
    }
  }

  const onRegisterSubmit = (data: TRegisterSchema) => {
    registerUser.mutate(data)
  }

  return (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Sign In</TabsTrigger>
        <TabsTrigger value="register">Create Account</TabsTrigger>
      </TabsList>

      {/* Login Form */}
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your journey with The Scent.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="login-email">Email</label>
                <input id="login-email" {...registerLogin('email')} className="w-full input-style" />
                {loginErrors.email && <p className="error-text">{loginErrors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" {...registerLogin('password')} className="w-full input-style" />
                {loginErrors.password && <p className="error-text">{loginErrors.password.message}</p>}
              </div>
              {loginErrors.root && <p className="error-text">{loginErrors.root.message}</p>}
              <Button type="submit" className="w-full" disabled={isLoginSubmitting}>
                {isLoginSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border dark:border-dark-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-limestone px-2 text-muted dark:bg-midnight dark:text-dark-muted">Or continue with</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full" onClick={() => signIn('google')}>
              <Chrome className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Registration Form */}
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Begin your journey with us today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" {...registerRegister('firstName')} className="w-full input-style" />
                  {registerErrors.firstName && <p className="error-text">{registerErrors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" {...registerRegister('lastName')} className="w-full input-style" />
                  {registerErrors.lastName && <p className="error-text">{registerErrors.lastName.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="register-email">Email</label>
                <input id="register-email" {...registerRegister('email')} className="w-full input-style" />
                {registerErrors.email && <p className="error-text">{registerErrors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" {...registerRegister('password')} className="w-full input-style" />
                {registerErrors.password && <p className="error-text">{registerErrors.password.message}</p>}
              </div>
               {registerUser.isError && <p className="error-text">{registerUser.error.message}</p>}
              <Button type="submit" className="w-full" disabled={isRegisterSubmitting}>
                {isRegisterSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

// Add these helper classes to app/globals.css
// .input-style { @apply block w-full rounded-md border-0 py-1.5 px-2 text-charcoal dark:text-pearl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sage dark:bg-charcoal dark:ring-dark-border; }
// .error-text { @apply text-sm text-red-600 mt-1; }
