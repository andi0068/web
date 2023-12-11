import { cn } from '@/lib/utils';

import { BEM_CLASS } from './auth.const';
import type { BaseProps } from './auth.types';

export function Root({ children, className }: BaseProps) {
  return <div className={cn(`${BEM_CLASS} flex flex-col min-h-screen`, className)}>{children}</div>;
}

export function Main({ children, className }: BaseProps) {
  return <main className={cn(`${BEM_CLASS}__main grow p-8`, className)}>{children}</main>;
}

export function Container({ children, className }: BaseProps) {
  return (
    <div className={cn(`${BEM_CLASS}__container mx-auto w-full max-w-[400px]`, className)}>
      {children}
    </div>
  );
}

export type * from './auth.types';
