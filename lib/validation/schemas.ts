// lib/validation/schemas.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
})

export const registerSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
})

export const shippingAddressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  addressLine1: z.string().min(1, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  stateProvince: z.string().min(1, 'State / Province is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  countryCode: z.string().min(2, 'Country is required'),
  phone: z.string().optional(),
})

export const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
})


export type TLoginSchema = z.infer<typeof loginSchema>
export type TRegisterSchema = z.infer<typeof registerSchema>
export type TShippingAddressSchema = z.infer<typeof shippingAddressSchema>
export type TNewsletterSchema = z.infer<typeof newsletterSchema>
