// server/routers/user.ts
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { hash } from 'bcryptjs'
import { TRPCError } from '@trpc/server'
import { registerSchema } from '@/lib/validation/schemas'

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session?.user
  }),

  register: publicProcedure.input(registerSchema).mutation(async ({ ctx, input }) => {
    const { firstName, lastName, email, password } = input

    const existingUser = await ctx.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'A user with this email already exists.',
      })
    }

    const hashedPassword = await hash(password, 12)

    const newUser = await ctx.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword,
      },
    })

    // Omitting password hash from the returned object
    const { passwordHash, ...userWithoutPassword } = newUser
    return userWithoutPassword
  }),
})
