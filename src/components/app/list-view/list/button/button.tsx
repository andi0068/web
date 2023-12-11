import { forwardRef } from 'react';

import Button from '@/lib/components/button';
import Icon from '@/lib/components/icon';
import AiPin from '@/lib/components/icons/pin';
import useFormatDate from '@/lib/hooks/use-format-date';
import useTrim from '@/lib/hooks/use-trim';
import { cn, ariaAttr } from '@/lib/utils';

import { BEM_CLASS } from './button.const';
import type { BaseProps, ButtonProps, MetaProps } from './button.types';

export const Root = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, onClick, active, ...rest }, ref) => (
    <Button
      ref={ref}
      variant="none"
      size="none"
      className={cn(
        // Reset starts
        'flex flex-col items-start justify-start',
        'whitespace-normal text-left font-normal',
        // Reset ends
        `${BEM_CLASS} rounded-lg aria-[current]:bg-fill-tertiary`,
        'p-5 w-full space-y-[.625rem]',
        className,
      )}
      onClick={onClick}
      aria-current={ariaAttr(active)}
      {...rest}
    >
      {children}
    </Button>
  ),
);

export function Title({ children, className }: BaseProps) {
  return <p className={cn(`${BEM_CLASS}__title text-lg font-semibold`, className)}>{children}</p>;
}

export function Meta({ className, date, content, pinned }: MetaProps) {
  return (
    <p className={cn(`${BEM_CLASS}__meta flex items-center`, 'max-w-full leading-5', className)}>
      {pinned && (
        <Icon
          as={AiPin}
          className={cn(`${BEM_CLASS}__meta__icon text-accent`, 'mr-[.375rem] text-sm')}
          aria-label="Pinned"
        />
      )}
      <time
        dateTime={date}
        className={cn(`${BEM_CLASS}__meta__date shrink-0 text-foreground-tertiary`, 'mr-2')}
      >
        {useFormatDate(date)}
      </time>
      <span className={`${BEM_CLASS}__meta__content truncate text-foreground-secondary`}>
        {useTrim(content, 30)}
      </span>
    </p>
  );
}

export type * from './button.types';
