'use client';
import { useState, useMemo } from 'react';

type UpdateFunction<T extends object> = (updates: Partial<T>) => void;

export interface UseClientConfigProps {
  key: string;
}

export type UseClientConfigReturn<T extends object> = {
  readonly value: Partial<T>;
  readonly update: UpdateFunction<T>;
};

export default function useClientConfig<T extends object>({
  key,
}: UseClientConfigProps): UseClientConfigReturn<T> {
  const storage = useStorage(key);
  const [value, dispatch] = useState<Partial<T>>(() => (isInBrowser() ? storage.get() : {}));

  return {
    value,
    update(updates) {
      dispatch((old) => storage.set({ ...old, ...updates }));
    },
  };
}

function useStorage(key: string) {
  return useMemo(() => Storage(key), []);
}

function Storage(key: string) {
  return {
    get<T extends object>(): Partial<T> {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : {};
    },

    set<T extends object>(value: T) {
      window.localStorage.setItem(key, JSON.stringify(value));
      return value;
    },
  };
}

function isInBrowser() {
  return typeof window !== 'undefined';
}
