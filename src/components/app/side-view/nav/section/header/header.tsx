import { cn } from '@/lib/utils';

import * as Base from '../../../../view/header';
import { BEM_CLASS } from './header.const';
import type { BaseProps } from './header.types';

export function Root({ children, className }: BaseProps) {
  return (
    <div
      className={cn(
        `${BEM_CLASS} sticky top-0 z-10 flex items-center`,
        'bg-background-primary',
        'px-[.625rem]',
        className,
      )}
      style={{
        height: 'calc(2.5rem + 4px)',
      }}
    >
      <div className={cn(`${BEM_CLASS}__inner grow flex items-end justify-between`, 'min-w-0 h-5')}>
        {children}
      </div>
    </div>
  );
}

export function Heading({ children, className }: BaseProps) {
  return (
    <Base.Heading
      as="span"
      size="none"
      className={cn(
        `${BEM_CLASS}__heading text-sm leading-[1.125rem] text-foreground-secondary`,
        className,
      )}
    >
      {children}
    </Base.Heading>
  );
}

export type * from './header.types';
