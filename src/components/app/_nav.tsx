'use client';
import { Fragment, useCallback } from 'react';
import { FiFolder } from 'react-icons/fi';

import * as ContextMenu from '@/lib/components/context-menu';
import { useAppState, useAppDispatch } from '@/context';

import { useEvents } from '.';
import * as Base from './side-view/nav';

interface AuthorOnlyBtnMenuProps {
  children: React.ReactElement;
  id: string;
}

/**
 * Features
 * - Select and Active state
 * - Context Menu
 *    - Rename folder (author only)
 *    - Delete folder (author only)
 *    - Create a new note inside (author only)
 */
export default function Nav() {
  return (
    <Base.Root>
      <Base.Section.Root>
        <Base.Section.Header.Root>
          <Base.Section.Header.Heading>Folders</Base.Section.Header.Heading>
        </Base.Section.Header.Root>
        <Base.Section.List.Container>
          <List />
        </Base.Section.List.Container>
      </Base.Section.Root>
    </Base.Root>
  );
}

function List() {
  const state = useAppState();
  const menu = useMenu();

  return (
    <Base.Section.List.Root>
      {state.folders.data.map((folder) => {
        const row = (
          <Base.Section.List.Row
            icon={FiFolder}
            active={menu.isActive(folder.id)}
            onClick={menu.onSelect(folder.id)}
          >
            {folder.name}
          </Base.Section.List.Row>
        );
        return (
          <Fragment key={folder.id}>
            {state.auth.user ? <AuthorOnlyBtnMenu id={folder.id}>{row}</AuthorOnlyBtnMenu> : row}
          </Fragment>
        );
      })}
    </Base.Section.List.Root>
  );
}

function AuthorOnlyBtnMenu({ children, id }: AuthorOnlyBtnMenuProps) {
  const ev = useEvents();

  const onRenameFolder = useCallback(() => ev.onRenameFolder?.({ id }), [id, ev.onRenameFolder]);
  const onDeleteFolder = useCallback(() => ev.onDeleteFolder?.({ id }), [id, ev.onDeleteFolder]);
  const onCreateNote = useCallback(
    () => ev.onCreateNote?.({ folder_id: id }),
    [id, ev.onCreateNote],
  );

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content>
          <ContextMenu.Item onClick={onRenameFolder}>Rename</ContextMenu.Item>
          <ContextMenu.Item onClick={onDeleteFolder}>Delete</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item onClick={onCreateNote}>Create note</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

function useMenu() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const isActive = (id: string) => id === state.folders.selected?.id;
  const onSelect = useCallback((id: string) => () => dispatch.select('folders', id), []);

  return {
    isActive,
    onSelect,
  } as const;
}
