'use client';
import { useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';

import { useAppState } from '@/context';

import * as Base from './view/header';

import { useEvents } from './_hooks';

/**
 * Features
 * - Create a new note (author only)
 */
export default function ListHeader() {
  const state = useAppState();
  const selected = state.folders.selected;

  return (
    <Base.Root>
      <Base.Heading>{selected ? selected.name : 'Notes'}</Base.Heading>
      {state.auth.user && <AuthorOnlyActions />}
    </Base.Root>
  );
}

function AuthorOnlyActions() {
  const state = useAppState();
  const ev = useEvents();

  const onCreate = useCallback(() => {
    if (state.folders.selected) {
      ev.onCreateNote?.({ folder_id: state.folders.selected.id });
    }
  }, [state.folders.selected, ev.onCreateNote]);

  return (
    <Base.Actions.Root>
      <Base.Actions.Action
        label="Create a new note"
        icon={FiPlus}
        disabled={!state.folders.selected}
        onClick={onCreate}
      />
    </Base.Actions.Root>
  );
}
