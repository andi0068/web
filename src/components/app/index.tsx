'use client';
import dynamic from 'next/dynamic';
import { useMemo, useCallback, useContext, createContext } from 'react';
import { FiFileText } from 'react-icons/fi';

import Spinner from '@/lib/components/spinner';
import useClientConfig, { type UseClientConfigReturn } from '@/lib/hooks/use-client-config';
import type * as Folders from '@/services/folders';
import type * as Notes from '@/services/notes';
import { useAppState, useAppDispatch } from '@/context';
import { APP_CLIENT_CONFIG_KEY } from '@/config/constants';
import type { AppClientConfig, Folder } from '@/types';

import * as Base from './app';
import * as SideView from './side-view';
import * as ListView from './list-view';
import * as EditorView from './editor-view';
import * as Loader from './loader';

import Nav from './_nav';
import NavHeader from './_nav-header';
import ListHeader from './_list-header';
import EditorHeader from './_editor-header';

type CreateFolderHandler = () => Promise<{ id: string }>;
type RenameFolderHandler = (params: Folder) => void;
type DeleteFolderHandler = (params: Folders.RemoveParams) => Promise<void>;

type CreateNoteHandler = (params: Notes.CreateParams) => Promise<{ id: string }>;
type UpdateNoteHandler = (params: Notes.UpdateParams, data: Notes.UpdateData) => Promise<void>;
type DeleteNoteHandler = (params: Notes.RemoveParams) => Promise<void>;

type Handlers = {
  onCreateFolder?: CreateFolderHandler;
  onRenameFolder?: RenameFolderHandler;
  onDeleteFolder?: DeleteFolderHandler;
  onCreateNote?: CreateNoteHandler;
  onUpdateNote?: UpdateNoteHandler;
  onDeleteNote?: DeleteNoteHandler;
  onLogin?(): void;
  onLogout?(): Promise<void>;
};

interface BaseProps {
  children?: React.ReactNode;
}
interface ConfigProviderProps {
  children?: React.ReactNode;
}
interface ProviderProps extends Handlers {
  children?: React.ReactNode;
}

const List = dynamic(() => import('./_list'), { ssr: false });
const Editor = dynamic(() => import('./_editor'), { ssr: false });

export function Content({ children }: BaseProps) {
  return (
    <Base.Content>
      <ViewsContainer>
        <SideView.Root>
          <NavHeader />
          <NavContainer>
            <Nav />
          </NavContainer>
        </SideView.Root>
        <ListView.Root>
          <ListHeader />
          <ListContainer>
            <List />
          </ListContainer>
        </ListView.Root>
        <EditorView.Root>
          <EditorHeader />
          <EditorContainer>
            <Editor />
          </EditorContainer>
        </EditorView.Root>
      </ViewsContainer>
      {children}
    </Base.Content>
  );
}

// Container **************************************************************************************

function ViewsContainer({ children }: BaseProps) {
  const state = useAppState();
  return state.folders.ready && state.notes.ready ? (
    <>{children}</>
  ) : (
    <Loader.Root overlay>
      <Loader.Content>
        <Spinner />
        <Loader.Typography>Loading...</Loader.Typography>
      </Loader.Content>
    </Loader.Root>
  );
}

function NavContainer({ children }: BaseProps) {
  return <SideView.ContentView>{children}</SideView.ContentView>;
}

function ListContainer({ children }: BaseProps) {
  const state = useAppState();
  return !state.folders.selected ? (
    <ListView.Alert>Select a folder to view.</ListView.Alert>
  ) : state.folders.selected.notes ? (
    <ListView.ContentView>{children}</ListView.ContentView>
  ) : (
    <ListView.Alert>This folder is empty.</ListView.Alert>
  );
}

function EditorContainer({ children }: BaseProps) {
  const state = useAppState();
  return state.notes.selected ? (
    <EditorView.ContentView>{children}</EditorView.ContentView>
  ) : (
    <EditorView.Alert.Root>
      <EditorView.Alert.Content>
        <EditorView.Alert.Icon as={FiFileText} />
        <EditorView.Alert.Title>Select a note to view</EditorView.Alert.Title>
        <EditorView.Alert.Description>
          Choose a note from the list on the left to view its contents, or create a new note to add
          to your collection.
        </EditorView.Alert.Description>
      </EditorView.Alert.Content>
    </EditorView.Alert.Root>
  );
}

// Hooks ******************************************************************************************

export function useConfig() {
  const { update } = useConfigContext();
  return {
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

// Context ****************************************************************************************

const ConfigContext = createContext<UseClientConfigReturn<AppClientConfig>>({
  value: {},
  update() {},
});

function useConfigContext() {
  return useContext(ConfigContext);
}

function ConfigProvider({ children }: ConfigProviderProps) {
  const config = useClientConfig<AppClientConfig>({
    key: APP_CLIENT_CONFIG_KEY,
  });
  const value = useMemo(
    (): UseClientConfigReturn<AppClientConfig> => ({
      value: config.value,
      update: config.update,
    }),
    [],
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

const HandlersContext = createContext<Handlers>({});

function useHandlersContext() {
  return useContext(HandlersContext);
}

export function Provider({
  children,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
  onLogin,
  onLogout,
}: ProviderProps) {
  const value = useMemo(
    () => ({
      onCreateFolder,
      onRenameFolder,
      onDeleteFolder,
      onCreateNote,
      onUpdateNote,
      onDeleteNote,
      onLogin,
      onLogout,
    }),
    [
      onCreateFolder,
      onRenameFolder,
      onDeleteFolder,
      onCreateNote,
      onUpdateNote,
      onDeleteNote,
      onLogin,
      onLogout,
    ],
  );
  return (
    <ConfigProvider>
      <HandlersContext.Provider value={value}>{children}</HandlersContext.Provider>
    </ConfigProvider>
  );
}

export { Root } from './app';
