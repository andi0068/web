'use client';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { BEM_CLASS, DEFAULTS } from './view.const';
import { Provider, useViewContext } from './view.context';
import styles from './view.module.css';
import type { BaseProps, ViewProps } from './view.types';

const getRootClassName = cva(`${BEM_CLASS} shrink-0 flex flex-col`, {
  variants: {
    size: {
      side: 'w-[14rem]',
      list: 'w-[18rem]',
      editor: 'grow min-w-[32.375rem]',
      full: 'w-full',
    },
    border: {
      right: 'border-r border-separator',
      none: undefined,
    },
  },
});

const getContentViewClassName = cva(
  `${BEM_CLASS}__content-view grow overflow-y-auto relative flex flex-col`,
  {
    variants: {
      scrollbar: {
        default: styles.scrollbar,
        minimize: [styles.scrollbar, styles.scrollbar_minimize],
      },
    },
  },
);

export function Root({
  children,
  className,
  as: As = 'section',
  scrollbar = DEFAULTS.scrollbar,
  size = DEFAULTS.size,
  border = DEFAULTS.border,
  ...rest
}: ViewProps) {
  return (
    <Provider scrollbar={scrollbar} size={size} border={border}>
      <As className={cn(getRootClassName({ size, border, className }))} {...rest}>
        {children}
      </As>
    </Provider>
  );
}

export function ContentView({ children, className }: BaseProps) {
  const { scrollbar } = useViewContext();
  return (
    <div className={cn(getContentViewClassName({ scrollbar, className }))} data-contentview>
      {children}
    </div>
  );
}

export * as Header from './header';
export type * from './view.types';
