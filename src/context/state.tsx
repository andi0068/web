'use client';
import { useState, useMemo, useContext, createContext } from 'react';

import type { Folder, Note } from '@/types';

type ResourceState<T> = {
  readonly ready: boolean;
  readonly raw: Record<string, T>;
  readonly data: T[];
  readonly selected?: T | null;
};
type State = {
  readonly auth: {
    readonly ready: boolean;
    readonly user: boolean;
  };
  readonly folders: ResourceState<Folder>;
  readonly notes: ResourceState<Note>;
};
type ContextType = State & {
  readonly dispatch: React.Dispatch<React.SetStateAction<State>>;
};

interface ProviderProps {
  children?: React.ReactNode;
}

const factory = {
  resource_initial_state<T>(): ResourceState<T> {
    return {
      ready: false,
      raw: {},
      data: [],
      selected: null,
    };
  },
};

const INITIAL_STATE: State = {
  auth: {
    ready: false,
    user: false,
  },
  folders: factory.resource_initial_state(),
  notes: factory.resource_initial_state(),
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
