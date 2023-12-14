import * as Base from '../view';
import type { BaseProps } from './side-view.types';

export function Root({ children, className }: BaseProps) {
  return (
    <Base.Root as="div" scrollbar="minimize" size="side" border="right" className={className}>
      {children}
    </Base.Root>
  );
}

export { ContentView } from '../view';
export * as Nav from './nav';
export type * from './side-view.types';
