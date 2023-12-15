'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Fragment, useEffect, useMemo, createElement } from 'react';

import { useAppState, useAppDispatch } from '@/context';
import * as Auth from '@/services/auth';
import * as Folders from '@/services/folders';
import * as Notes from '@/services/notes';
import { get } from '@/utils/list-utils';

type RedirectPaths = {
  public: string;
  auth: string;
  user: string;
};

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

export function useGet(source: 'notes', by?: Record<string, true>) {
  const state = useAppState();

  const { raw } = state[source];

  return useMemo(() => get(raw, by), [raw, by]);
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
