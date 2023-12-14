'use client';
import { FiFolderPlus } from 'react-icons/fi';

import { useAppState } from '@/context';

import { useEvents } from '.';
import * as Base from './view/header';

/**
 * Features
 * - Create a new folder (author only)
 */
export default function NavHeader() {
  const state = useAppState();
  return (
    <Base.Root>
      <Base.Heading as="h1">Collections</Base.Heading>
      {state.auth.user && <AuthorOnlyActions />}
    </Base.Root>
  );
}

function AuthorOnlyActions() {
  const ev = useEvents();
  return (
    <Base.Actions.Root>
      <Base.Actions.Action
        label="Create a new folder"
        icon={FiFolderPlus}
        onClick={ev.onCreateFolder}
      />
    </Base.Actions.Root>
  );
}
