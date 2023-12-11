'use client';
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';

import IconButton from '@/lib/components/icon-button';
import Icon from '@/lib/components/icon';
import { cn } from '@/lib/utils';

import { BEM_CLASS } from './actions.const';
import { useActionsContext } from './actions.context';
import type { ActionsProps, ActionProps } from './actions.types';

const getRootClassName = cva(`${BEM_CLASS} inline-flex -m-[.625rem]`, {
  variants: {
    size: {
      lg: undefined,
      xl: 'space-x-2',
    },
  },
});

const getActionClassName = cva(`${BEM_CLASS}__action`, {
  variants: {
    size: {
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
});

export function Root({ children, className, role = 'group' }: ActionsProps) {
  const { size } = useActionsContext();
  return (
    <div className={`${BEM_CLASS}-container inline-flex`}>
      <div role={role} className={cn(getRootClassName({ size, className }))}>
        {children}
      </div>
    </div>
  );
}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  ({ className, role, disabled, onClick, label, icon, ...rest }, ref) => {
    const { size } = useActionsContext();
    return (
      <IconButton
        ref={ref}
        role={role}
        colorScheme="gray"
        variant="plain"
        icon={<Icon as={icon} />}
        disabled={disabled}
        onClick={onClick}
        className={cn(getActionClassName({ size, className }))}
        aria-label={label}
        {...rest}
      />
    );
  },
);

export { Provider } from './actions.context';
export type * from './actions.types';
