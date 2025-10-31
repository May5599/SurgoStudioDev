import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to combine and merge Tailwind classes safely.
 * @param  {...any} inputs - Class names
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

