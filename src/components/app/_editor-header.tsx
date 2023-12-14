'use client';
import { useCallback } from 'react';
import { FiSidebar } from 'react-icons/fi';

import AiOptions from '@/lib/components/icons/options';
import DropdownMenu from '@/components/dropdown-menu';
import { useAppState } from '@/context';
import type { Menu } from '@/types';

import { useEvents } from '.';
import * as Base from './view/header';

/**
 * Features
 * - Delete note (author only)
 * - Login and Log out
 */
export default function EditorHeader() {
  return (
    <Base.Root>
      <LeftActions />
      <RightActions />
    </Base.Root>
  );
}

function LeftActions() {
  return (
    <Base.Actions.Root>
      <Base.Actions.Action label="Toggle Side Bar" icon={FiSidebar} disabled aria-hidden />
    </Base.Actions.Root>
  );
}

function RightActions() {
  return (
    <Base.Actions.Root>
      <MoreOptionsDropdownMenu>
        <Base.Actions.Action label="More options" icon={AiOptions} />
      </MoreOptionsDropdownMenu>
    </Base.Actions.Root>
  );
}

function MoreOptionsDropdownMenu({ children }: { children: React.ReactElement }) {
  const state = useAppState();
  const ev = useEvents();

  const onDelete = useCallback(
    () => ev.onDeleteNote?.({ id: state.notes.selected!.id }),
    [state.notes.selected, ev.onDeleteNote],
  );

  const items: Menu[] = state.auth.user
    ? [
        { key: 'delete', label: 'Delete', disabled: !state.notes.selected, onClick: onDelete },
        'separator',
        { key: 'auth', label: 'Log out', onClick: ev.onLogout },
      ]
    : [{ key: 'auth', label: 'Login', onClick: ev.onLogin }];

  return (
    <DropdownMenu align="end" items={items}>
      {children}
    </DropdownMenu>
  );
}
