import { cn } from '@/lib/utils';

import { BEM_CLASS } from './card.const';
import type { BasePropsWithAs } from './card.types';

export function Root({ children, className, as: As = 'section', ...rest }: BasePropsWithAs) {
  return (
    <As
      className={cn(
        `${BEM_CLASS} overflow-x-hidden relative`,
        'rounded-lg bg-background-primary',
        'p-8',
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

export function Header({ children, className, as: As = 'header', ...rest }: BasePropsWithAs) {
  return (
    <As className={cn(`${BEM_CLASS}__header text-center`, className)} {...rest}>
      {children}
    </As>
  );
}

export function Heading({ children, className, as: As = 'h2', ...rest }: BasePropsWithAs) {
  return (
    <As className={cn(`${BEM_CLASS}__heading font-bold`, 'mb-8 text-3xl', className)} {...rest}>
      {children}
    </As>
  );
}

export type * from './card.types';
