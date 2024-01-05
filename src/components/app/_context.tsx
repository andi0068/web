'use client';
import { useMemo, useContext, createContext } from 'react';

import type * as Folders from '@/services/folders';
import type * as Notes from '@/services/notes';
import type { Folder } from '@/types';

// Handlers ***************************************************************************************

type CreateFolderHandler = () => Promise<{ id: string }>;
type RenameFolderHandler = (params: Folder) => void;
type DeleteFolderHandler = (params: Folders.RemoveParams) => Promise<void>;

type CreateNoteHandler = (params: Notes.CreateParams) => Promise<{ id: string }>;
type UpdateNoteHandler = (params: Notes.UpdateParams, data: Notes.UpdateData) => Promise<void>;
type DeleteNoteHandler = (params: Notes.RemoveParams) => Promise<void>;

type Handlers = {
  onLogin?(): void;
  onLogout?(): Promise<void>;
  onCreateFolder?: CreateFolderHandler;
  onRenameFolder?: RenameFolderHandler;
  onDeleteFolder?: DeleteFolderHandler;
  onCreateNote?: CreateNoteHandler;
  onUpdateNote?: UpdateNoteHandler;
  onDeleteNote?: DeleteNoteHandler;
};

export interface HandlersProviderProps extends Handlers {
  children?: React.ReactNode;
}

const HandlersContext = createContext<Handlers>({});

export function useHandlersContext() {
  return useContext(HandlersContext);
}

export function HandlersProvider({
  children,
  onLogin,
  onLogout,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
}: HandlersProviderProps) {
  const value = useMemo(
    () => ({
      onLogin,
      onLogout,
      onCreateFolder,
      onRenameFolder,
      onDeleteFolder,
      onCreateNote,
      onUpdateNote,
      onDeleteNote,
    }),
    [
      onLogin,
      onLogout,
      onCreateFolder,
      onRenameFolder,
      onDeleteFolder,
      onCreateNote,
      onUpdateNote,
      onDeleteNote,
    ],
  );
  return <HandlersContext.Provider value={value}>{children}</HandlersContext.Provider>;
}
