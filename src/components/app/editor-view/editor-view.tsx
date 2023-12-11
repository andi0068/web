import * as Base from '../view';
import type { BaseProps } from './editor-view.types';

export function Root({ children, className }: BaseProps) {
  return (
    <Base.Root size="editor" className={className}>
      {children}
    </Base.Root>
  );
}

export { ContentView } from '../view';
export * as Editor from './editor';
export * as Alert from './alert';
export type * from './editor-view.types';
