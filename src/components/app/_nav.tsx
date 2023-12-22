'use client';
import React, { Fragment, useMemo } from 'react';
import { FiPlus, FiFolder } from 'react-icons/fi';

import ContextMenu from '@/components/context-menu';
import { useAppState } from '@/context';
import { useMenu, useMenuFactory } from '@/hooks';
import type { Menu } from '@/types';

import * as Base from './side-view/nav';
import * as Actions from './view/header/actions';

import { useEvents } from './_hooks';

interface SectionProps {
  name: string;
  children?: React.ReactNode;
  action?: React.ReactElement;
}
interface FolderAuthorCtxMenuProps {
  children: React.ReactElement;
  id: string;
}

/**
 * Features
 * - "Folders" Section
 *   - Select and Active state
 *   - Create a new folder (author only)
 *   - Context Menu (author only)
 *     - Rename folder
 *     - Delete folder
 *     - Create a new note inside
 */
export default function Nav() {
  return (
    <Base.Root>
      <Section name="Folders" action={<FoldersAction />}>
        <FoldersList />
      </Section>
    </Base.Root>
  );
}

// Sections ***************************************************************************************

function FoldersAction() {
  const state = useAppState();
  return <>{state.auth.user ? <CreateFolderAuthorAction /> : null}</>;
}

function FoldersList() {
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
            {state.auth.user ? (
              <FolderAuthorCtxMenu id={folder.id}>{row}</FolderAuthorCtxMenu>
            ) : (
              row
            )}
          </Fragment>
        );
      })}
    </Base.Section.List.Root>
  );
}

// Actions ****************************************************************************************

function CreateFolderAuthorAction() {
  const ev = useEvents();
  return <Actions.Action label="Create a new folder" icon={FiPlus} onClick={ev.onCreateFolder} />;
}

// Context Menus **********************************************************************************

function FolderAuthorCtxMenu({ children, id }: FolderAuthorCtxMenuProps) {
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

// Component Builders *****************************************************************************

function Section({ children, name, action }: SectionProps) {
  return (
    <Base.Section.Root>
      <Base.Section.Header.Root>
        <Base.Section.Header.Heading>{name}</Base.Section.Header.Heading>
        {action && (
          <Actions.Provider size="lg">
            <Actions.Root>{action}</Actions.Root>
          </Actions.Provider>
        )}
      </Base.Section.Header.Root>
      {children}
    </Base.Section.Root>
  );
}
