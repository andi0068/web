import { useEffect, useRef } from 'react';

export default function useDebounce(cb: () => void, deps: React.DependencyList) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeoutRef.current = setTimeout(cb, 500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, deps);
}
