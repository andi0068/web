import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { BEM_CLASS, HEADING_DEFAULTS } from './header.const';
import type { HeaderProps, HeadingProps } from './header.types';

const getHeadingClassName = cva(`${BEM_CLASS}__heading cursor-default truncate font-semibold`, {
  variants: {
    size: {
      default: 'text-[1.375rem] leading-7',
      none: undefined,
    },
  },
});

export function Root({ children, className, as: As = 'header', ...rest }: HeaderProps) {
  return (
    <As className={cn(`${BEM_CLASS} p-6`, className)} data-header {...rest}>
      <div className={cn(`${BEM_CLASS}__inner flex items-center justify-between`, 'h-5 space-x-5')}>
        {children}
      </div>
    </As>
  );
}

export function Heading({
  children,
  className,
  as: As = 'h2',
  size = HEADING_DEFAULTS.size,
  ...rest
}: HeadingProps) {
  return (
    <As className={cn(getHeadingClassName({ size, className }))} {...rest}>
      {children}
    </As>
  );
}

export * as Actions from './actions';
export type * from './header.types';
