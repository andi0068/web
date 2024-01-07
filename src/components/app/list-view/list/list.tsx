import { cn, dataAttr } from '@/lib/utils';

import { BEM_CLASS } from './list.const';
import type { ListProps, RowProps } from './list.types';

export function Root({ children, className, as: As = 'ul', ...rest }: ListProps) {
  return (
    <As
      className={cn(
        `${BEM_CLASS} grow flex flex-col`,
        'py-6 px-5 [[data-header]+[data-contentview]_&]:pt-[.375rem]',
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

export function Row({ children, className, as: As = 'li', active, ...rest }: RowProps) {
  return (
    <As
      className={cn(
        `${BEM_CLASS}__row border-t border-separator first-of-type:border-t-0 last-of-type:border-b`,
        'hover:border-transparent data-[current]:border-transparent [:hover+&]:border-t-transparent [[data-current]+&]:border-t-transparent',
        'mx-5',
        className,
      )}
      data-current={dataAttr(active)}
      {...rest}
    >
      <div className={`${BEM_CLASS}__row__inner -mx-5`}>{children}</div>
    </As>
  );
}

export * as Button from './button';
export type * from './list.types';
