import { useMemo } from 'react';

export default function useFormatDate(date: string) {
  return useMemo(() => formatDate(date), [date]);
}

const cache = new Map();

export function formatDate(date: string) {
  if (!cache.has(date)) {
    cache.set(
      date,
      new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    );
  }

  return cache.get(date);
}
