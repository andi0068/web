'use client';
import { useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';

import { useAppState } from '@/hooks';

import * as Base from './view/header';

import { useEvents } from './_hooks';

/**
 * Features
 * - Actions (author only)
 *   - "Create a new note"
 */
export default function ListHeader() {
  const state = useAppState();

  const folder = state.folders.selected;
  const title = folder ? folder.name : 'Notes';

  return (
    <Base.Root>
      <Base.Heading>{title}</Base.Heading>
      {state.auth.user && (
        <Base.Actions.Root>
          <CreateNoteAction folderId={folder?.id} />
        </Base.Actions.Root>
      )}
    </Base.Root>
  );
}

// Actions ****************************************************************************************

function CreateNoteAction({ folderId }: { folderId?: string }) {
  const ev = useEvents();

  const onCreate = useCallback(
    () => ev.onCreateNote?.({ folder_id: folderId! }),
    [folderId, ev.onCreateNote],
  );

  return (
    <Base.Actions.Action
      label="Create a new note"
      icon={FiPlus}
      disabled={!folderId}
      onClick={onCreate}
    />
  );
}
