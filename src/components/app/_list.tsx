'use client';
import { useMemo, memo } from 'react';

import ContextMenu from '@/components/context-menu';
import { useAppState, useMenu, useGet, useMenuFactory } from '@/hooks';
import { sortDesc, sortByPinned } from '@/utils/list-utils';
import type { Menu, Note } from '@/types';

import * as Base from './list-view/list';

import { useEvents } from './_hooks';

type SelectHandler = (id: string) => () => void;

interface RowProps extends Note {
  active: boolean;
  enableContextMenu?: boolean;
  onSelect?: SelectHandler;
}
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
      {list.map((note) => (
        <Row
          key={note.id}
          enableContextMenu={state.auth.user}
          active={menu.isSelected(note.id)}
          onSelect={menu.onSelect}
          {...note}
        />
      ))}
    </Base.Root>
  );
}

const Row = memo(function Row({
  id,
  folder_id,
  date,
  title,
  content,
  pinned,
  enableContextMenu,
  active,
  onSelect,
}: RowProps) {
  const button = (
    <Base.Button.Root active={active} onClick={onSelect?.(id)}>
      <Base.Button.Title>{title}</Base.Button.Title>
      <Base.Button.Meta date={date} content={content} pinned={pinned} />
    </Base.Button.Root>
  );
  return (
    <Base.Row key={id} active={active}>
      {enableContextMenu ? (
        <ButtonContextMenu id={id} folder_id={folder_id} pinned={pinned}>
          {button}
        </ButtonContextMenu>
      ) : (
        button
      )}
    </Base.Row>
  );
});

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
