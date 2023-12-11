import { forwardRef } from 'react';

import RootTextEdit from '@/lib/components/text-edit';
import { cn } from '@/lib/utils';

import { BEM_CLASS } from './editor.const';
import type { BaseProps, TextEditProps } from './editor.types';

export function Root({ children, className }: BaseProps) {
  return (
    <section className={cn(`${BEM_CLASS} grow flex flex-col`, className)} data-editor>
      {children}
    </section>
  );
}

export const TextEdit = forwardRef<HTMLTextAreaElement, TextEditProps>(
  ({ className, ...rest }, ref) => (
    <div
      className={cn(
        `${BEM_CLASS}__text-edit-container grow`,
        'p-10 [[data-editorheader]+&]:pt-[1.875rem]',
      )}
    >
      <RootTextEdit
        ref={ref}
        color="secondary"
        placeholder="Type your note"
        className={cn(`${BEM_CLASS}__text-edit -m-3 p-3 leading-7`, className)}
        {...rest}
      />
    </div>
  ),
);

export * as Header from './header';
export type * from './editor.types';
