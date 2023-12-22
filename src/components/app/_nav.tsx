'use client';
import { Fragment, useMemo } from 'react';
import { FiPlus, FiFolder } from 'react-icons/fi';

import ContextMenu from '@/components/context-menu';
import { useAppState } from '@/context';
import { useMenu, useMenuFactory } from '@/hooks';
import type { Menu } from '@/types';

import * as Base from './side-view/nav';
import * as Actions from './view/header/actions';

import { useEvents } from './_hooks';

interface AuthorOnlyBtnMenuProps {
  children: React.ReactElement;
  id: string;
}

/**
 * Features
 * - Create a new folder (author only)
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
        <Header />
        <Base.Section.List.Container>
          <List />
        </Base.Section.List.Container>
      </Base.Section.Root>
    </Base.Root>
  );
}

function Header() {
  const state = useAppState();
  return (
    <Base.Section.Header.Root>
      <Base.Section.Header.Heading>Folders</Base.Section.Header.Heading>
      {state.auth.user && <AuthorOnlyActions />}
    </Base.Section.Header.Root>
  );
}

function AuthorOnlyActions() {
  const ev = useEvents();
  return (
    <Actions.Provider size="lg">
      <Actions.Root>
        <Actions.Action label="Create a new folder" icon={FiPlus} onClick={ev.onCreateFolder} />
      </Actions.Root>
    </Actions.Provider>
  );
}

function List() {
  const state = useAppState();
  const menu = useMenu('folders');

  return (
    <Base.Section.List.Root>
      {state.folders.data.map((folder) => {
        const row = (
          <Base.Section.List.Row
            icon={FiFolder}
            active={menu.isSelected(folder.id)}
            count={Object.keys(folder.notes ?? {}).length}
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
  const factory = useMenuFactory(
    {
      onRenameFolder() {
        ev.onRenameFolder?.({ id });
      },
      onDeleteFolder() {
        ev.onDeleteFolder?.({ id });
      },
      onCreateNote() {
        ev.onCreateNote?.({ folder_id: id });
      },
    },
    [id, ev.onRenameFolder, ev.onDeleteFolder, ev.onCreateNote],
  );

  const items = useMemo(
    (): Menu[] => [
      factory.author.rename_folder,
      factory.author.delete_folder,
      'separator',
      factory.author.create_note_inside,
    ],
    [factory],
  );

  return <ContextMenu items={items}>{children}</ContextMenu>;
}
