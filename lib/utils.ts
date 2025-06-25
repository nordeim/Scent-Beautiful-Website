// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function to conditionally join class names together.
 * It also merges Tailwind CSS classes without style conflicts.
 * @param inputs - A list of class values (strings, objects, arrays).
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
