import { useEffect } from 'react';

export default function useCallOnResize<T extends Element>(
  ref: React.RefObject<T>,
  cb: (element: T) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => cb(entries[0].target as T));
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, []);
}
