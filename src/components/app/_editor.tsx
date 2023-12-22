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
  const ev = useEvents();

  if (!state.notes.selected) {
    throw Error('Please unmount it component, while state.notes.selected is null or undefined.');
  }

  const { selected } = state.notes;
  const readOnly = !state.auth.user;

  const onChange = useCallback(
    (key: 'title' | 'content') => (val: string) => {
      ev.onUpdateNote?.({ id: selected.id }, { [key]: val });
    },
    [selected.id, ev.onUpdateNote],
  );

  return (
    <Base.Root>
      <Base.Header.Root>
        <Base.Header.Heading required readOnly={readOnly} onChange={onChange('title')}>
          {selected.title}
        </Base.Header.Heading>
      </Base.Header.Root>
      <Base.TextEdit value={selected.content} readOnly={readOnly} onChange={onChange('content')} />
    </Base.Root>
  );
}
