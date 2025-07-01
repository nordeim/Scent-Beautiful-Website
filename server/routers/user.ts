// server/routers/user.ts
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { hash, compare } from 'bcryptjs'
import { TRPCError } from '@trpc/server'
import { registerSchema, profileSchema, passwordChangeSchema } from '@/lib/validation/schemas'

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    // Fetch the full user object for the profile page
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    })
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

    const { passwordHash, ...userWithoutPassword } = newUser
    return userWithoutPassword
  }),

  updateProfile: protectedProcedure
    .input(profileSchema)
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName } = input
      const userId = ctx.session.user.id

      const updatedUser = await ctx.prisma.user.update({
        where: { id: userId },
        data: { firstName, lastName },
      })

      return updatedUser
    }),

  updatePassword: protectedProcedure
    .input(passwordChangeSchema)
    .mutation(async ({ ctx, input }) => {
      const { currentPassword, newPassword } = input
      const userId = ctx.session.user.id

      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
      })

      if (!user || !user.passwordHash) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found.' })
      }

      const isPasswordValid = await compare(currentPassword, user.passwordHash)

      if (!isPasswordValid) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Incorrect current password.' })
      }

      const newHashedPassword = await hash(newPassword, 12)

      await ctx.prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newHashedPassword },
      })

      return { success: true, message: 'Password updated successfully.' }
    }),
})
