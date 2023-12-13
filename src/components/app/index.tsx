'use client';
import dynamic from 'next/dynamic';
import { useMemo, useCallback, useContext, createContext } from 'react';
import { FiFileText } from 'react-icons/fi';

import Spinner from '@/lib/components/spinner';
import { useAppState, useAppDispatch } from '@/context';

import * as Base from './app';
import * as ListView from './list-view';
import * as EditorView from './editor-view';
import * as Loader from './loader';

import List from './_list';
import ListHeader from './_list-header';
import EditorHeader from './_editor-header';

type CreateHandler = () => Promise<{ id: string }>;
type UpdateHandler = (
  params: { id: string },
  data: { title?: string; content?: string; pinned?: boolean },
) => Promise<void>;
type DeleteHandler = (params: { id: string }) => Promise<void>;

type Handlers = {
  onCreate?: CreateHandler;
  onUpdate?: UpdateHandler;
  onDelete?: DeleteHandler;
  onLogin?(): void;
  onLogout?(): Promise<void>;
};

interface BaseProps {
  children?: React.ReactNode;
}
interface ProviderProps extends Handlers {
  children?: React.ReactNode;
}

const Editor = dynamic(() => import('./_editor'), { ssr: false });

export function Content({ children }: BaseProps) {
  return (
    <Base.Content>
      <ViewsContainer>
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

function ViewsContainer({ children }: { children?: React.ReactNode }) {
  const state = useAppState();
  return state.preload ? (
    <Loader.Root overlay>
      <Loader.Content>
        <Spinner />
        <Loader.Typography>Loading...</Loader.Typography>
      </Loader.Content>
    </Loader.Root>
  ) : (
    <>{children}</>
  );
}

function ListContainer({ children }: { children?: React.ReactNode }) {
  const state = useAppState();
  return state.notes.data.length ? (
    <ListView.ContentView>{children}</ListView.ContentView>
  ) : (
    <ListView.Alert>This folder is empty.</ListView.Alert>
  );
}

function EditorContainer({ children }: { children?: React.ReactNode }) {
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

export function useEvents() {
  const dispatch = useAppDispatch();
  const handlers = useHandlersContext();

  const onCreate = useCallback(async () => {
    if (handlers.onCreate) {
      const { id } = await handlers.onCreate();
      dispatch.select('notes', id);
    }
  }, [handlers.onCreate]);

  const { onUpdate, onDelete, onLogin, onLogout } = handlers;

  return {
    onCreate,
    onUpdate,
    onDelete,
    onLogin,
    onLogout,
  } as const;
}

// Context ****************************************************************************************

const HandlersContext = createContext<Handlers>({});

function useHandlersContext() {
  return useContext(HandlersContext);
}

export function Provider({
  children,
  onCreate,
  onUpdate,
  onDelete,
  onLogin,
  onLogout,
}: ProviderProps) {
  const value = useMemo(
    () => ({ onCreate, onUpdate, onDelete, onLogin, onLogout }),
    [onCreate, onUpdate, onDelete, onLogin, onLogout],
  );
  return <HandlersContext.Provider value={value}>{children}</HandlersContext.Provider>;
}

export { Root } from './app';
