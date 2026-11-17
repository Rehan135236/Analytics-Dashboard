import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind classes conditionally without conflicts.
 * Combines `clsx` for conditional objects/arrays and `tailwind-merge` to resolve CSS specificity conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
