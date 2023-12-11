import { cn } from '@/lib/utils';

import * as Base from '../view';
import { BEM_CLASS } from './list-view.const';
import type { BaseProps } from './list-view.types';

export function Root({ children, className }: BaseProps) {
  return (
    <Base.Root scrollbar="minimize" size="list" border="right" className={className}>
      {children}
    </Base.Root>
  );
}

export function Alert({ children, className }: BaseProps) {
  return (
    <p
      role="alert"
      className={cn(
        `${BEM_CLASS}__alert grow`,
        'font-medium text-foreground-secondary',
        'p-6 [[data-header]+&]:pt-[.375rem]',
        className,
      )}
    >
      {children}
    </p>
  );
}

export { ContentView } from '../view';
export * as List from './list';
export type * from './list-view.types';
