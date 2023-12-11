import { useMemo } from 'react';

export default function useTrim(string: string, length: number) {
  return useMemo(() => string.substring(0, length), [string, length]);
}
