import { forwardRef } from 'react';

import useEditable from '@/lib/hooks/use-editable';
import { cn } from '@/lib/utils';

import { BEM_CLASS } from './header.const';
import type { BaseProps, HeadingProps } from './header.types';

export function Root({ children, className }: BaseProps) {
  return (
    <header
      className={cn(
        `${BEM_CLASS} p-10 pb-0 [[data-header]+[data-contentview]_[data-editor]_&]:pt-[.375rem]`,
        className,
      )}
      data-editorheader
    >
      {children}
    </header>
  );
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: As = 'h2', ...rest }, ref) => {
    const props = useEditable(rest);
    return (
      <As
        ref={ref}
        className={cn(
          `${BEM_CLASS}__heading font-semibold outline-none`,
          '-m-3 p-3 text-[2rem] leading-10',
          className,
        )}
        {...props}
      />
    );
  },
);

export type * from './header.types';
