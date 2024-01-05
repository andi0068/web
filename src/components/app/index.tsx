'use client';
import dynamic from 'next/dynamic';
import { FiFileText } from 'react-icons/fi';

import Spinner from '@/lib/components/spinner';
import { useAppState } from '@/hooks';

import * as Base from './app';
import * as SideView from './side-view';
import * as ListView from './list-view';
import * as EditorView from './editor-view';
import * as Loader from './loader';

import NavHeader from './_nav-header';
import ListHeader from './_list-header';
import EditorHeader from './_editor-header';
import { useConfig } from './_hooks';

interface BaseProps {
  children?: React.ReactNode;
}

const Nav = dynamic(() => import('./_nav'), { ssr: false });
const List = dynamic(() => import('./_list'), { ssr: false });
const Editor = dynamic(() => import('./_editor'), { ssr: false });

export function Content({ children }: BaseProps) {
  return (
    <Base.Content>
      <ViewsContainer>
        <SideViewContainer>
          <SideView.Root>
            <NavHeader />
            <NavContainer>
              <Nav />
            </NavContainer>
          </SideView.Root>
        </SideViewContainer>
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

function SideViewContainer({ children }: BaseProps) {
  const { sidebar_collapsed } = useConfig();
  return <>{sidebar_collapsed ? null : children}</>;
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

export { Root } from './app';
export { Provider } from './_provider';
