import RootIcon from '@/lib/components/icon';
import forwardRef from '@/lib/forward-ref';
import { cn } from '@/lib/utils';

import { BEM_CLASS } from './alert.const';
import type { BaseProps } from './alert.types';

export function Root({ children, className }: BaseProps) {
  return (
    <div
      role="alert"
      className={cn(
        `${BEM_CLASS} grow flex flex-col items-center justify-center`,
        'p-10 [[data-header]+&]:pt-[.375rem]',
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
      className={cn(
        `${BEM_CLASS}__content flex flex-col items-center`,
        'text-center',
        'space-y-[.625rem]',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const Icon = forwardRef<BaseProps, 'svg'>(({ className, ...rest }, ref) => (
  <RootIcon
    ref={ref}
    className={cn(`${BEM_CLASS}__icon stroke-1 text-[5rem]`, className)}
    {...rest}
  />
));

export function Title({ children, className }: BaseProps) {
  return (
    <p className={cn(`${BEM_CLASS}__title text-[1.75rem] leading-9 font-semibold`, className)}>
      {children}
    </p>
  );
}

export function Description({ children, className }: BaseProps) {
  return (
    <p
      className={cn(
        `${BEM_CLASS}__description text-foreground-secondary`,
        'max-w-[28.75rem] leading-[1.625rem]',
        className,
      )}
    >
      {children}
    </p>
  );
}

export type * from './alert.types';
