'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Fragment, useEffect, useMemo, useCallback, createElement } from 'react';

import { useStateContext } from '@/context/state';
import * as Auth from '@/services/auth';
import * as Folders from '@/services/folders';
import * as Notes from '@/services/notes';
import { get } from '@/utils/list-utils';
import * as StateFactory from '@/utils/factory-utils/state';
import * as MenuFactory from '@/utils/factory-utils/menu';
import type { FoldersRecord, NotesRecord, Folder, Note } from '@/types';

type RedirectPaths = {
  public: string;
  auth: string;
  user: string;
};

export function useAppState() {
  const { auth, folders, notes } = useStateContext();
  return {
    auth,
    folders,
    notes,
  } as const;
}

export function useAppDispatch() {
  const { dispatch } = useStateContext();

  function authReady(user: boolean) {
    dispatch((state) => ({
      ...state,
      auth: StateFactory.auth.ready(user),
    }));
  }

  function loaded<Source extends 'folders' | 'notes'>(
    source: Source,
    raw: { folders: FoldersRecord; notes: NotesRecord }[Source],
  ) {
    dispatch((state) => ({
      ...state,
      [source]: StateFactory.resource.updates<Folder | Note>(
        state[source].ready ? { raw } : { ready: { raw } },
        state[source],
      ),
    }));
  }

  function select(source: 'folders' | 'notes', id: string) {
    dispatch((state) => ({
      ...state,
      [source]: StateFactory.resource.updates<Folder | Note>({ selected: { id } }, state[source]),
    }));
  }

  return {
    authReady,
    loaded,
    select,
  } as const;
}

export function useAuthInitiator() {
  const dispatch = useAppDispatch();

  Auth.useSubscribe((user) => {
    dispatch.authReady(Boolean(user));
  });
}

export function useFoldersInitiator() {
  const dispatch = useAppDispatch();

  Folders.useSubscribe((record) => {
    dispatch.loaded('folders', record);
  });
}

export function useNotesInitiator() {
  const dispatch = useAppDispatch();

  Notes.useSubscribe((record) => {
    dispatch.loaded('notes', record);
  });
}

export function useRedirector(paths: RedirectPaths) {
  const router = useRouter();
  const pathname = usePathname();
  const state = useAppState();

  useEffect(() => {
    if (!state.auth.ready) return;

    if (state.auth.user) {
      if (pathname === paths.public || pathname === paths.auth) router.replace(paths.user);
    } else {
      if (pathname === paths.public) return;
      if (pathname === paths.user) router.replace(paths.public);
    }
  }, [pathname, state.auth.ready, state.auth.user]);
}

export function useMenu(source: 'folders' | 'notes') {
  const state = useAppState();
  const dispatch = useAppDispatch();

  function isSelected(id: string) {
    return state[source].selected?.id === id;
  }

  const onSelect = useCallback((id: string) => () => dispatch.select(source, id), [source]);

  return {
    isSelected,
    onSelect,
  } as const;
}

export function useGet(source: 'notes', by?: Record<string, true>) {
  const state = useAppState();

  const { raw } = state[source];

  return useMemo(() => get(raw, by), [raw, by]);
}

export function useMenuFactory(props: MenuFactory.CreateProps, deps: React.DependencyList) {
  return useMemo(() => MenuFactory.Create(props), deps);
}

export function AuthInitiator() {
  useAuthInitiator();
  return createElement(Fragment);
}

export function FoldersInitiator() {
  useFoldersInitiator();
  return createElement(Fragment);
}

export function NotesInitiator() {
  useNotesInitiator();
  return createElement(Fragment);
}

export function Redirector({ paths }: { paths: RedirectPaths }) {
  useRedirector(paths);
  return createElement(Fragment);
}
