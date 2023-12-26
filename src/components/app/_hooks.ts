'use client';
import { useCallback } from 'react';

import type * as Notes from '@/services/notes';
import { useAppState, useAppDispatch } from '@/context';

import { useConfigContext, useHandlersContext } from './_context';

type CollapsibleConfigKey =
  | 'sidebar_collapsed'
  | 'sidebar_recents_collapsed'
  | 'sidebar_folders_collapsed';

export function useCollapsible(key: CollapsibleConfigKey) {
  const config = useConfig();
  const value = config[key];

  const onToggle = useCallback(() => config.update({ [key]: !value }), [key, value]);

  return {
    collapsed: value,
    onToggle,
  } as const;
}

export function useConfig() {
  const {
    value: { sidebar_collapsed, sidebar_recents_collapsed, sidebar_folders_collapsed },
    update,
  } = useConfigContext();
  return {
    sidebar_collapsed,
    sidebar_recents_collapsed,
    sidebar_folders_collapsed,
    update,
  } as const;
}

export function useEvents() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const handlers = useHandlersContext();

  const onRenameFolder = useCallback(
    (params: { id: string }) => {
      const folder = state.folders.raw[params.id];
      if (folder) {
        handlers.onRenameFolder?.(folder);
      }
    },
    [state.folders.raw, handlers.onRenameFolder],
  );

  const onCreateNote = useCallback(
    async (params: Notes.CreateParams) => {
      if (handlers.onCreateNote) {
        const { id } = await handlers.onCreateNote(params);
        dispatch.select('notes', id);
      }
    },
    [handlers.onCreateNote],
  );

  const { onCreateFolder, onDeleteFolder, onUpdateNote, onDeleteNote, onLogin, onLogout } =
    handlers;

  return {
    onCreateFolder,
    onRenameFolder,
    onDeleteFolder,
    onCreateNote,
    onUpdateNote,
    onDeleteNote,
    onLogin,
    onLogout,
  } as const;
}
