import { Session } from 'next-auth'

export const permissions = {
  'settings:manage': ['staff'],
  'order:view': ['customer', 'staff'],
  'product:edit': ['staff'],
} as const

export type Permission = keyof typeof permissions
export type AllowedRole = (typeof permissions)[Permission][number]

export function hasPermission(session: Session | null, permission: Permission): boolean {
  if (!session?.user?.role) return false
  const allowedRoles = [...permissions[permission]] as string[]
  return allowedRoles.includes(session.user.role)
}

export function requirePermission(session: Session | null, permission: Permission): void {
  if (!hasPermission(session, permission)) {
    throw new Error('Unauthorized')
  }
}
