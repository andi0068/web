'use client';
import { cn } from '@/lib/utils';

import { BEM_CLASS } from './app.const';
import styles from './app.module.css';
import type { BaseProps, ContentProps } from './app.types';

export function Root({ children, className }: BaseProps) {
  return (
    <div
      className={cn(`${BEM_CLASS} flex flex-col items-center justify-center h-screen`, className)}
    >
      {children}
    </div>
  );
}

export function Content({ children, className, as: As = 'main', ...rest }: ContentProps) {
  return (
    <As
      className={cn(
        `${BEM_CLASS}__content overflow-hidden relative flex w-full h-full`,
        'bg-background-primary',
        styles.content,
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

export type * from './app.types';
