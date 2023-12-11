'use client';
import { useMemo, useContext, createContext } from 'react';

import { DEFAULTS } from './view.const';
import type { ProviderProps } from './view.types';

const Context = createContext({ ...DEFAULTS });

export function useViewContext() {
  return useContext(Context);
}

export function Provider({
  children,
  scrollbar = DEFAULTS.scrollbar,
  size = DEFAULTS.size,
  border = DEFAULTS.border,
}: ProviderProps) {
  const value = useMemo(() => ({ scrollbar, size, border }), [scrollbar, size, border]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
