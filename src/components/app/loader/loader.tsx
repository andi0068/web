import { cn } from '@/lib/utils';

import { BEM_CLASS, DEFAULTS } from './loader.const';
import type { BaseProps, LoaderProps } from './loader.types';

export function Root({ children, className, overlay = DEFAULTS.overlay }: LoaderProps) {
  return (
    <div
      className={cn(
        `${BEM_CLASS} flex items-center justify-center`,
        overlay && 'absolute inset-0 z-loader bg-background-primary',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Content({ children, className }: BaseProps) {
  return (
    <div
      role="alert"
      className={cn(
        `${BEM_CLASS}__content flex flex-col items-center`,
        'text-center rounded-xl bg-fill-quaternary',
        'p-8 space-y-5',
        className,
      )}
      aria-busy
    >
      {children}
    </div>
  );
}

export function Typography({ children, className }: BaseProps) {
  return <p className={cn(`${BEM_CLASS}__typography max-w-xs`, className)}>{children}</p>;
}

export type * from './loader.types';
