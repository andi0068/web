'use client';
import * as Base from '@/lib/components/toast';

export function Viewport() {
  return (
    <Base.ManagerState>
      {({ contents }) => (
        <Base.Viewport className="absolute">
          {contents.map(({ id, content }) => (
            <Base.Root key={id} className="rounded-lg">
              {content}
            </Base.Root>
          ))}
        </Base.Viewport>
      )}
    </Base.ManagerState>
  );
}

export { Provider, useToast } from '@/lib/components/toast';
