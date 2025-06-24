import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string().email(),
})

export const passwordSchema = z.string().min(8)
