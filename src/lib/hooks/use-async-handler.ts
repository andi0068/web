import { useState, useCallback } from 'react';

type Handler = (...args: any[]) => void | Promise<any>;

/**
 * @returns [loading, handler]
 */
export default function useAsyncHandler<T extends Handler>(fn?: T) {
  const [loading, setLoading] = useState(false);

  const callback: Handler = async (...args) => {
    if (!fn) return;
    setLoading(true);
    try {
      await fn(...args);
    } finally {
      setLoading(false);
    }
  };

  const handler = useCallback(callback as T, [fn]);

  return [loading, handler] as const;
}
