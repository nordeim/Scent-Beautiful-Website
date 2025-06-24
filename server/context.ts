import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db/client'
import { authOptions } from '@/lib/auth/config'

export async function createContext() {
  const session = await getServerSession(authOptions)
  return { session, prisma }
}

export type Context = Awaited<ReturnType<typeof createContext>>
