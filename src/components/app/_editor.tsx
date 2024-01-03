'use client';
import { useMemo, useCallback, useContext, createContext } from 'react';

import { useAppState } from '@/context';

import * as Base from './editor-view/editor';

import { useEvents } from './_hooks';

type UpdateData = {
  title?: string;
  content?: string;
};
type ChangeHandler = (data: UpdateData) => Promise<void>;

interface ProviderProps {
  children?: React.ReactNode;
}

/**
 * Features
 * - Edit and save (author only)
 */
export default function Editor() {
  return (
    <Provider>
      <Base.Root>
        <Base.Header.Root>
          <Heading />
        </Base.Header.Root>
        <TextEdit />
      </Base.Root>
    </Provider>
  );
}

function Heading() {
  const editor = useEditorContext();
  const onChange = useChangeHandler('title');

  return (
    <Base.Header.Heading required readOnly={editor.readOnly} onChange={onChange}>
      {editor.title}
    </Base.Header.Heading>
  );
}

function TextEdit() {
  const editor = useEditorContext();
  const onChange = useChangeHandler('content');

  return <Base.TextEdit value={editor.content} readOnly={editor.readOnly} onChange={onChange} />;
}

// Hooks ******************************************************************************************

function useChangeHandler<K extends keyof UpdateData>(key: K) {
  const editor = useEditorContext();

  return useCallback(
    async (value: UpdateData[K]) => editor.onChange?.({ [key]: value }),
    [key, editor.onChange],
  );
}

// Context ****************************************************************************************

type ContextType = {
  title: string;
  content: string;
  readOnly: boolean;
  onChange?: ChangeHandler;
};

const Context = createContext({} as ContextType);

function useEditorContext() {
  return useContext(Context);
}

function Provider({ children }: ProviderProps) {
  const state = useAppState();

  if (!state.notes.selected) {
    throw Error('Please unmount it component, while state.notes.selected is null or undefined.');
  }

  const ev = useEvents();

  const { id, title, content } = state.notes.selected;
  const readOnly = !state.auth.user;

  const onChange: ChangeHandler = useCallback(
    async (data) => ev.onUpdateNote?.({ id }, data),
    [id, ev.onUpdateNote],
  );

  const value = useMemo(
    () => ({ id, title, content, readOnly, onChange }),
    [id, title, content, readOnly, onChange],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
