'use client';
import { useState, useMemo, useContext, createContext } from 'react';

import * as factory from '@/utils/factory-utils/state';
import type { State } from '@/types';

type ContextType = State & {
  readonly dispatch: React.Dispatch<React.SetStateAction<State>>;
};

interface ProviderProps {
  children?: React.ReactNode;
}

const INITIAL_STATE: State = {
  auth: factory.auth.initial(),
  folders: factory.resource.initial(),
  notes: factory.resource.initial(),
};
const DEFAULT_VALUE: ContextType = {
  ...INITIAL_STATE,
  dispatch() {},
};

const Context = createContext<ContextType>({ ...DEFAULT_VALUE });

export function useStateContext() {
  return useContext(Context);
}

export function Provider({ children }: ProviderProps) {
  const [{ auth, folders, notes }, dispatch] = useState<State>(() => ({
    ...INITIAL_STATE,
  }));
  const value: ContextType = useMemo(
    () => ({ auth, folders, notes, dispatch }),
    [
      auth.ready,
      auth.user,
      folders.ready,
      folders.raw,
      folders.data,
      folders.selected,
      notes.ready,
      notes.raw,
      notes.data,
      notes.selected,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
