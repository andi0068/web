import Button from '@/lib/components/button';
import Icon from '@/lib/components/icon';
import forwardRef from '@/lib/forward-ref';
import { cn, ariaAttr } from '@/lib/utils';

import { BEM_CLASS } from './list.const';
import type { BaseProps, ListProps, RowProps } from './list.types';

export function Container({ children, className }: BaseProps) {
  return <div className={cn(`${BEM_CLASS}-container py-[2px]`, className)}>{children}</div>;
}

export function Root({ children, className, isEmpty, emptyText }: ListProps) {
  return isEmpty ? (
    <p
      role="alert"
      className={cn(
        `${BEM_CLASS}--alert flex items-center`,
        'text-foreground-secondary',
        'px-[.625rem] h-10 text-sm',
      )}
    >
      {emptyText}
    </p>
  ) : (
    <div role="menu" className={cn(`${BEM_CLASS} flex flex-col`, 'space-y-[4px]', className)}>
      {children}
    </div>
  );
}

export const Row = forwardRef<RowProps, 'button'>(
  ({ children, className, icon, active, count, ...rest }, ref) => (
    <Button
      ref={ref}
      role="menuitem"
      variant="none"
      size="none"
      className={cn(
        // Reset starts
        'transition-none before:transition-none',
        // Reset ends
        `${BEM_CLASS}__button group justify-between`,
        'rounded-md text-foreground-secondary hover:text-foreground-primary',
        'aria-[current]:text-foreground-primary aria-[current]:bg-fill-quaternary',
        'px-[.625rem] w-full h-10',
        className,
      )}
      aria-current={ariaAttr(active)}
      {...rest}
    >
      <span className="inline-flex items-center min-w-0">
        <Icon
          as={icon}
          className={cn('text-accent group-hover:scale-105 group-active:scale-100', 'mr-3 text-xl')}
        />
        <span className="truncate">{children}</span>
      </span>
      {count !== undefined && (
        <span className={cn('text-foreground-tertiary', 'ml-2 mr-1 text-sm')}>{count}</span>
      )}
    </Button>
  ),
);

export type * from './list.types';
