'use client';
import { useMemo, useContext, createContext } from 'react';

import useClientConfig, { type UseClientConfigReturn } from '@/lib/hooks/use-client-config';
import type * as Folders from '@/services/folders';
import type * as Notes from '@/services/notes';
import { APP_CLIENT_CONFIG_KEY } from '@/config/constants';
import type { AppClientConfig, Folder } from '@/types';

// Config *****************************************************************************************

interface ConfigProviderProps {
  children?: React.ReactNode;
}

const ConfigContext = createContext<UseClientConfigReturn<AppClientConfig>>({
  value: {},
  update() {},
});

export function useConfigContext() {
  return useContext(ConfigContext);
}

function ConfigProvider({ children }: ConfigProviderProps) {
  const config = useClientConfig<AppClientConfig>({
    key: APP_CLIENT_CONFIG_KEY,
  });

  const value = useMemo(
    (): UseClientConfigReturn<AppClientConfig> => ({ ...config }),
    [
      config.value.sidebar_collapsed,
      config.value.sidebar_recents_collapsed,
      config.value.sidebar_folders_collapsed,
    ],
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

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

interface HandlersProviderProps extends Handlers {
  children?: React.ReactNode;
}

const HandlersContext = createContext<Handlers>({});

export function useHandlersContext() {
  return useContext(HandlersContext);
}

function HandlersProvider({
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

// Provider ***************************************************************************************

interface ProviderProps extends HandlersProviderProps {
  children?: React.ReactNode;
}

export function Provider({
  children,
  onLogin,
  onLogout,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
}: ProviderProps) {
  return (
    <ConfigProvider>
      <HandlersProvider
        onLogin={onLogin}
        onLogout={onLogout}
        onCreateFolder={onCreateFolder}
        onRenameFolder={onRenameFolder}
        onDeleteFolder={onDeleteFolder}
        onCreateNote={onCreateNote}
        onUpdateNote={onUpdateNote}
        onDeleteNote={onDeleteNote}
      >
        {children}
      </HandlersProvider>
    </ConfigProvider>
  );
}
