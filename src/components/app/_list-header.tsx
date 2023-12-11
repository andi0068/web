'use client';
import { FiFilePlus } from 'react-icons/fi';

import { useAppState } from '@/context';

import { useEvents } from '.';
import * as Base from './view/header';

/**
 * Features
 * - Create a new note (author only)
 */
export default function ListHeader() {
  const state = useAppState();
  return (
    <Base.Root>
      <Base.Heading>Notes</Base.Heading>
      {state.auth.user && <AuthorOnlyActions />}
    </Base.Root>
  );
}

function AuthorOnlyActions() {
  const ev = useEvents();
  return (
    <Base.Actions.Root>
      <Base.Actions.Action label="Create a new note" icon={FiFilePlus} onClick={ev.onCreate} />
    </Base.Actions.Root>
  );
}
