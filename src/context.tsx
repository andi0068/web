'use client';
import { useState, useMemo, useContext, createContext } from 'react';

import type { NotesRecord, Note } from '@/types';

type State = {
  readonly auth: {
    readonly ready: boolean;
    readonly user: boolean;
  };
  readonly preload: boolean;
  readonly notes: {
    readonly raw: NotesRecord;
    readonly data: Note[];
    readonly selected?: Note | null;
  };
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
  notes: {
    raw: {},
    data: [],
    selected: null,
  },
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
  const [{ auth, preload, notes }, dispatch] = useState<State>(() => ({
    ...INITIAL_STATE,
  }));
  const value: ContextType = useMemo(
    () => ({ auth, preload, notes, dispatch }),
    [auth.ready, auth.user, preload, notes.raw, notes.data, notes.selected],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAppState() {
  const { auth, preload, notes } = useRootContext();
  return {
    auth,
    preload,
    notes,
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
      notes: {
        raw,
        data: Object.values(raw),
        selected: state.notes.selected ? raw[state.notes.selected.id] : state.notes.selected,
      },
    }));
  }

  function select(source: 'notes', id: string) {
    dispatch((state) => ({
      ...state,
      [source]: {
        ...state[source],
        selected: state[source].raw[id],
      },
    }));
  }

  function unselect(source: 'notes') {
    dispatch((state) => ({
      ...state,
      [source]: {
        ...state[source],
        selected: null,
      },
    }));
  }

  return {
    authReady,
    loaded,
    select,
    unselect,
  } as const;
}
