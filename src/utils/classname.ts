import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

// since im using tailwind, this utility allows to merge conflicting classes but also programmatically add classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
