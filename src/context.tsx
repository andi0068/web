'use client';
import { useState, useMemo, useContext, createContext } from 'react';

import type { NotesRecord, Note } from '@/types';

type State = {
  readonly auth: {
    readonly ready: boolean;
    readonly user: boolean;
  };
  readonly preload: boolean;
  readonly raw: NotesRecord;
  readonly data: Note[];
  readonly selected?: Note | null;
};
type ContextType = State & {
  readonly dispatch: React.Dispatch<React.SetStateAction<State>>;
};

interface ProviderProps {
  children?: React.ReactNode;
}

const INITIAL_STATE: State = {
  auth: {
    ready: false,
    user: false,
  },
  preload: true,
  raw: {},
  data: [],
  selected: null,
};
const DEFAULT_VALUE: ContextType = {
  ...INITIAL_STATE,
  dispatch() {},
};

const Context = createContext<ContextType>({ ...DEFAULT_VALUE });

function useRootContext() {
  return useContext(Context);
}

export function Provider({ children }: ProviderProps) {
  const [{ auth, preload, raw, data, selected }, dispatch] = useState<State>(() => ({
    ...INITIAL_STATE,
  }));
  const value: ContextType = useMemo(
    () => ({ auth, preload, raw, data, selected, dispatch }),
    [auth.ready, auth.user, preload, raw, data, selected],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAppState() {
  const { auth, preload, raw, data, selected } = useRootContext();
  return {
    auth,
    preload,
    raw,
    data,
    selected,
  } as const;
}

export function useAppDispatch() {
  const { dispatch } = useRootContext();

  function authReady(user: boolean) {
    dispatch((state) => ({
      ...state,
      auth: {
        ready: true,
        user,
      },
    }));
  }

  function loaded(raw: NotesRecord) {
    dispatch((state) => ({
      ...state,
      preload: false,
      raw,
      data: Object.values(raw),
      selected: state.selected ? raw[state.selected?.id] : state.selected,
    }));
  }

  function select(id: string) {
    dispatch((state) => ({
      ...state,
      selected: state.raw[id],
    }));
  }

  function unselect() {
    dispatch((state) => ({
      ...state,
      selected: null,
    }));
  }

  return {
    authReady,
    loaded,
    select,
    unselect,
  } as const;
}
