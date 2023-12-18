import { cn } from '@/lib/utils';

import * as Base from '../view';
import { BEM_CLASS } from './side-view.const';
import type { BaseProps } from './side-view.types';

export function Root({ children, className }: BaseProps) {
  return (
    <Base.Root
      as="div"
      scrollbar="minimize"
      size="side"
      className={cn(`${BEM_CLASS} bg-background-secondary`, className)}
    >
      {children}
    </Base.Root>
  );
}

export { ContentView } from '../view';
export * as Nav from './nav';
export type * from './side-view.types';
