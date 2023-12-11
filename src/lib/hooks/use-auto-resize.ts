import { useLayoutEffect } from 'react';

import useCallOnResize from './use-call-on-resize';

export interface UseAutoResizeProps {
  ref: React.RefObject<HTMLTextAreaElement>;
  value: string;
}

export default function useAutoResize({ ref, value }: UseAutoResizeProps) {
  useCallOnResize(ref, (el) => {
    el.style.removeProperty('height');
    el.style.height = `${el.scrollHeight}px`;
  });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.height = `${el.scrollHeight}px`;

    return () => {
      el.style.removeProperty('height');
    };
  }, [value]);
}
