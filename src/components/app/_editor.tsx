'use client';
import { useCallback } from 'react';

import { useAppState } from '@/context';

import * as Base from './editor-view/editor';

import { useEvents } from './_hooks';

/**
 * Features
 * - Edit and save (author only)
 */
export default function Editor() {
  const state = useAppState();

  if (!state.notes.selected) {
    throw Error('Please unmount it component, while state.notes.selected is null or undefined.');
  }

  const ev = useEvents();

  const note = state.notes.selected;
  const readOnly = !state.auth.user;

  const onChange = useCallback(
    (key: 'title' | 'content') => (val: string) => {
      ev.onUpdateNote?.({ id: note.id }, { [key]: val });
    },
    [note.id, ev.onUpdateNote],
  );

  return (
    <Base.Root>
      <Base.Header.Root>
        <Base.Header.Heading required readOnly={readOnly} onChange={onChange('title')}>
          {note.title}
        </Base.Header.Heading>
      </Base.Header.Root>
      <Base.TextEdit value={note.content} readOnly={readOnly} onChange={onChange('content')} />
    </Base.Root>
  );
}
