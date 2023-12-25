'use client';
import { useMemo, useCallback } from 'react';
import { FiSidebar, FiMoreVertical } from 'react-icons/fi';

import DropdownMenu from '@/components/dropdown-menu';
import { useAppState } from '@/context';
import { useMenuFactory } from '@/hooks';
import type { Menu } from '@/types';

import * as Base from './view/header';

import { useConfig, useEvents } from './_hooks';

/**
 * Features
 * - Toggle Side Bar
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
  const config = useConfig();

  const onToggleSidebar = useCallback(
    () => config.update({ sidebar_collapsed: !config.sidebar_collapsed }),
    [config.sidebar_collapsed],
  );

  return (
    <Base.Actions.Root>
      <Base.Actions.Action
        label="Toggle Side Bar"
        icon={FiSidebar}
        onClick={onToggleSidebar}
        aria-pressed={config.sidebar_collapsed}
      />
    </Base.Actions.Root>
  );
}

function RightActions() {
  return (
    <Base.Actions.Root>
      <MoreOptionsDropdownMenu>
        <Base.Actions.Action label="More options" icon={FiMoreVertical} />
      </MoreOptionsDropdownMenu>
    </Base.Actions.Root>
  );
}

function MoreOptionsDropdownMenu({ children }: { children: React.ReactElement }) {
  const state = useAppState();
  const ev = useEvents();
  const factory = useMenuFactory(
    {
      onDeleteNote() {
        ev.onDeleteNote?.({ id: state.notes.selected!.id });
      },
    },
    [state.notes.selected, ev.onDeleteNote],
  );

  const items = useMemo((): Menu[] => {
    if (state.auth.user) {
      return [{ ...factory.author.delete_note, disabled: !state.notes.selected }];
    }
    return [factory.general.no_content];
  }, [state.auth.user, state.notes.selected, factory]);

  return (
    <DropdownMenu align="end" items={items}>
      {children}
    </DropdownMenu>
  );
}
