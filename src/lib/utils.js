import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names with Tailwind class conflict resolution.
 *
 * @param  {...any} classes - Accepts multiple class inputs like strings, arrays, conditionals.
 * @returns {string} A clean, merged class string.
 */
export function cn(...classes) {
  return twMerge(clsx(...classes));
}
