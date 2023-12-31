'use client';
import { useMemo } from 'react';

import ContextMenu from '@/components/context-menu';
import { useAppState } from '@/context';
import { useMenu, useGet, useMenuFactory } from '@/hooks';
import { sortDesc, sortByPinned } from '@/utils/list-utils';
import type { Menu, Note } from '@/types';

import * as Base from './list-view/list';

import { useEvents } from './_hooks';

interface ButtonContextMenuProps {
  children: React.ReactElement;
  id: string;
  folder_id: string;
  pinned?: boolean;
}

const SOURCE = 'notes';

/**
 * Features
 * - Sorted items
 * - Select and Active state
 * - Context Menu (author only)
 *    - Delete note
 *    - Move note
 *    - Toggle "Pin note"
 */
export default function List() {
  const state = useAppState();

  if (!state.folders.selected) {
    throw Error('Please unmount it component, while state.folders.selected is null or undefined.');
  }

  const items = useGet(SOURCE, state.folders.selected[SOURCE]);
  const list = useList(items);
  const menu = useMenu(SOURCE);

  return (
    <Base.Root>
      {list.map((note) => {
        const active = menu.isSelected(note.id);
        const button = (
          <Base.Button.Root active={active} onClick={menu.onSelect(note.id)}>
            <Base.Button.Title>{note.title}</Base.Button.Title>
            <Base.Button.Meta date={note.date} content={note.content} pinned={note.pinned} />
          </Base.Button.Root>
        );
        return (
          <Base.Row key={note.id} active={active}>
            {state.auth.user ? (
              <ButtonContextMenu id={note.id} folder_id={note.folder_id} pinned={note.pinned}>
                {button}
              </ButtonContextMenu>
            ) : (
              button
            )}
          </Base.Row>
        );
      })}
    </Base.Root>
  );
}

// Context Menus **********************************************************************************

function ButtonContextMenu({ children, id, folder_id, pinned }: ButtonContextMenuProps) {
  const state = useAppState();
  const ev = useEvents();
  const factory = useMenuFactory(
    {
      onMoveNote(folder) {
        ev.onUpdateNote?.({ id }, { folder_id: folder.id });
      },
      onPinNote() {
        ev.onUpdateNote?.({ id }, { pinned: true });
      },
      onUnpinNote() {
        ev.onUpdateNote?.({ id }, { pinned: false });
      },
      onDeleteNote() {
        ev.onDeleteNote?.({ id });
      },
    },
    [id, ev.onUpdateNote, ev.onDeleteNote],
  );

  const items = useMemo(
    (): Menu[] => [
      factory.author.delete_note,
      'separator',
      factory.author.move_note({ folder_id }, state.folders.data),
      factory.author[pinned ? 'unpin_note' : 'pin_note'], // Toggle "Pin note"
    ],
    [folder_id, pinned, state.folders.data, factory],
  );

  return <ContextMenu items={items}>{children}</ContextMenu>;
}

// Hooks ******************************************************************************************

function useList(notes: Note[]) {
  return useMemo(() => sortByPinned(sortDesc(notes)), [notes]);
}
