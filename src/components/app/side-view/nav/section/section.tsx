import { cn } from '@/lib/utils';

import { BEM_CLASS } from './section.const';
import type { BaseProps } from './section.types';

export function Root({ children, className }: BaseProps) {
  return <div className={cn(`${BEM_CLASS} flex flex-col`, className)}>{children}</div>;
}

export * as Header from './header';
export * as List from './list';
export type * from './section.types';
