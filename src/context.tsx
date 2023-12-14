'use client';
import { useState, useMemo, useContext, createContext } from 'react';

import type { NotesRecord, Note } from '@/types';

type State = {
  readonly auth: {
    readonly ready: boolean;
    readonly user: boolean;
  };
  readonly notes: {
    readonly ready: boolean;
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
  notes: {
    ready: false,
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
  const [{ auth, notes }, dispatch] = useState<State>(() => ({
    ...INITIAL_STATE,
  }));
  const value: ContextType = useMemo(
    () => ({ auth, notes, dispatch }),
    [auth.ready, auth.user, notes.ready, notes.raw, notes.data, notes.selected],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAppState() {
  const { auth, notes } = useRootContext();
  return {
    auth,
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

  function loaded<Source extends 'notes'>(source: Source, raw: { notes: NotesRecord }[Source]) {
    dispatch((state) => ({
      ...state,
      [source]: {
        ready: true,
        raw,
        data: Object.values(raw),
        selected: state[source].selected ? raw[state[source].selected!.id] : state[source].selected,
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
