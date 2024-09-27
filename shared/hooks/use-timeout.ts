import { useRef } from 'react';

export default function useTimeout() {
  const ref = useRef<NodeJS.Timeout>();

  function set(callback: () => void, ms?: number) {
    ref.current = setTimeout(callback, ms);
    return clear;
  }

  function clear() {
    if (ref.current) clearTimeout(ref.current);
  }

  return {
    set,
    clear,
  } as const;
}
