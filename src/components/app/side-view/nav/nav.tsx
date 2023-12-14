import { cn } from '@/lib/utils';

import { BEM_CLASS } from './nav.const';
import type { BaseProps } from './nav.types';

export function Root({ children, className }: BaseProps) {
  return (
    <nav
      className={cn(
        `${BEM_CLASS} grow flex flex-col`,
        'pt-3 pb-[1.375rem] px-[.875rem] [[data-header]+[data-contentview]_&]:pt-0',
        className,
      )}
    >
      {children}
    </nav>
  );
}

export * as Section from './section';
export type * from './nav.types';
