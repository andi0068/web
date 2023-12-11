'use client';
import { useMemo, useContext, createContext } from 'react';

import { DEFAULTS } from './actions.const';
import type { ProviderProps } from './actions.types';

const Context = createContext({ ...DEFAULTS });

export function useActionsContext() {
  return useContext(Context);
}

export function Provider({ children, size = DEFAULTS.size }: ProviderProps) {
  const value = useMemo(() => ({ size }), [size]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
