import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Booleanish = boolean | 'true' | 'false';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function dataAttr(condition: boolean | undefined) {
  return (condition ? '' : undefined) as Booleanish;
}

export function ariaAttr(condition: boolean | undefined) {
  return condition ? true : undefined;
}
