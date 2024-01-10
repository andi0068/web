'use client';
import { useMemo } from 'react';
import { FiSidebar, FiMoreVertical } from 'react-icons/fi';

import DropdownMenu from '@/components/dropdown-menu';
import { useAppState, useAppDispatch, useMenuFactory } from '@/hooks';
import { isNonNullable } from '@/utils/ts-utils';
import type { Menu } from '@/types';

import * as Base from './view/header';

import { useCollapsible, useEvents } from './_hooks';

/**
 * Features
 * - Actions
 *   - "Toggle Side Bar"
 *   - "More options" with Dropdown Menu
 *     - Delete note (author only)
 *     - Close note
 */
export default function EditorHeader() {
  return (
    <Base.Root>
      <Base.Actions.Root>
        <ToggleSidebarAction />
      </Base.Actions.Root>

      <Base.Actions.Root>
        <MoreOptionsAction />
      </Base.Actions.Root>
    </Base.Root>
  );
}

// Actions ****************************************************************************************

function MoreOptionsAction() {
  return (
    <MoreOptionsDropdownMenu>
      <Base.Actions.Action label="More options" icon={FiMoreVertical} />
    </MoreOptionsDropdownMenu>
  );
}

function ToggleSidebarAction() {
  const { collapsed, onToggle } = useCollapsible('sidebar_collapsed');
  return (
    <Base.Actions.Action
      label="Toggle Side Bar"
      icon={FiSidebar}
      onClick={onToggle}
      aria-pressed={collapsed}
    />
  );
}

// Dropdown Menus *********************************************************************************

function MoreOptionsDropdownMenu({ children }: { children: React.ReactElement }) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const ev = useEvents();
  const factory = useMenuFactory(
    {
      onDeleteNote() {
        ev.onDeleteNote?.({ id: state.notes.selected!.id });
      },
      onCloseNote() {
        dispatch.unselect('notes');
      },
    },
    [state.notes.selected, ev.onDeleteNote],
  );

  const isNoteSelected = isNonNullable(state.notes.selected);

  const items = useMemo((): Menu[] => {
    if (state.auth.user) {
      return [
        { ...factory.author.delete_note, disabled: !isNoteSelected },
        ...(isNoteSelected ? ['separator' as const, factory.general.close_note] : []),
      ];
    }
    return [isNoteSelected ? factory.general.close_note : factory.general.no_content];
  }, [state.auth.user, isNoteSelected, factory]);

  return (
    <DropdownMenu align="end" items={items}>
      {children}
    </DropdownMenu>
  );
}
