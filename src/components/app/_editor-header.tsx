'use client';
import { useMemo } from 'react';
import { FiSidebar, FiMoreVertical } from 'react-icons/fi';

import DropdownMenu from '@/components/dropdown-menu';
import { useAppState } from '@/context';
import { useMenuFactory } from '@/hooks';
import type { Menu } from '@/types';

import * as Base from './view/header';

import { useCollapsible, useEvents } from './_hooks';

/**
 * Features
 * - Actions
 *   - "Toggle Side Bar"
 *   - "More options" with Dropdown Menu
 *     - Delete note (author only)
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
