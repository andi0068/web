'use client';
import { useMemo } from 'react';
import { FiSidebar } from 'react-icons/fi';

import AiOptions from '@/lib/components/icons/options';
import DropdownMenu from '@/components/dropdown-menu';
import { useAppState } from '@/context';
import { useMenuFactory } from '@/hooks';
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
  const factory = useMenuFactory(
    {
      onLogin: ev.onLogin,
      onLogout: ev.onLogout,
      onDeleteNote() {
        ev.onDeleteNote?.({ id: state.notes.selected!.id });
      },
    },
    [state.notes.selected, ev.onLogin, ev.onLogout, ev.onDeleteNote],
  );

  const items = useMemo((): Menu[] => {
    if (state.auth.user) {
      return [
        { ...factory.author.delete_note, disabled: !state.notes.selected },
        'separator',
        factory.general.logout,
      ];
    }
    return [factory.general.login];
  }, [state.auth.user, state.notes.selected, factory]);

  return (
    <DropdownMenu align="end" items={items}>
      {children}
    </DropdownMenu>
  );
}
