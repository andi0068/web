'use client';
import { useMemo, useCallback } from 'react';

import * as ContextMenu from '@/lib/components/context-menu';
import { useAppState } from '@/context';
import { useMenu, useGet } from '@/hooks';
import { sortDesc, sortByPinned } from '@/utils/list-utils';
import type { Note } from '@/types';

import { useEvents } from '.';
import * as Base from './list-view/list';

interface AuthorOnlyBtnMenuProps {
  children: React.ReactElement;
  id: string;
  pinned?: boolean;
}

const SOURCE = 'notes';

/**
 * Features
 * - Sorted items
 * - Select and Active state
 * - Context Menu
 *    - Toggle "Pin note" (author only)
 *    - Delete note (author only)
 */
export default function List() {
  const state = useAppState();

  if (!state.folders.selected) {
    throw Error('Please unmount it component, while state.folders.selected is null or undefined.');
  }

  const items = useGet(SOURCE, state.folders.selected[SOURCE]);
  const list = useSort(items);
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
              <AuthorOnlyBtnMenu id={note.id} pinned={note.pinned}>
                {button}
              </AuthorOnlyBtnMenu>
            ) : (
              button
            )}
          </Base.Row>
        );
      })}
    </Base.Root>
  );
}

function AuthorOnlyBtnMenu({ children, id, pinned }: AuthorOnlyBtnMenuProps) {
  const ev = useEvents();

  const onPin = useCallback(() => ev.onUpdateNote?.({ id }, { pinned: true }), [ev.onUpdateNote]);
  const onUnpin = useCallback(
    () => ev.onUpdateNote?.({ id }, { pinned: false }),
    [ev.onUpdateNote],
  );
  const onDelete = useCallback(() => ev.onDeleteNote?.({ id }), [ev.onDeleteNote]);

  const items = [
    { key: 'delete', label: 'Delete', onClick: onDelete },
    pinned // Toggle "Pin note"
      ? { key: 'pin', label: 'Unpin note', onClick: onUnpin }
      : { key: 'pin', label: 'Pin note', onClick: onPin },
  ];

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content>
          {items.map(({ key, label, onClick }) => (
            <ContextMenu.Item key={key} onClick={onClick}>
              {label}
            </ContextMenu.Item>
          ))}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

function useSort(notes: Note[]) {
  return useMemo(() => sortByPinned(sortDesc(notes)), [notes]);
}
