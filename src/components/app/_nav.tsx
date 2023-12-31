'use client';
import React, { Fragment, useMemo } from 'react';
import { FiPlus, FiFolder, FiFileText, FiChevronDown } from 'react-icons/fi';

import { ariaAttr } from '@/lib/utils';
import ContextMenu from '@/components/context-menu';
import { useAppState } from '@/context';
import { useMenu, useMenuFactory } from '@/hooks';
import { sortDesc } from '@/utils/list-utils';
import type { Menu } from '@/types';

import * as Base from './side-view/nav';
import * as Actions from './view/header/actions';

import { useCollapsible, useEvents } from './_hooks';

type SectionName = 'recents' | 'folders';

interface SectionProps {
  name: SectionName;
  children?: React.ReactNode;
  action?: React.ReactElement;
}
interface ToggleActionProps {
  name: SectionName;
}
interface FolderContextMenuProps {
  children: React.ReactElement;
  id: string;
}

/**
 * Features
 * - "Recents" Section
 *   - Select and Active state
 *   - Sorted items
 *   - Actions
 *     - Toggle menu
 * - "Folders" Section
 *   - Select and Active state
 *   - Actions
 *     - "Create a new folder" (author only)
 *     - Toggle menu
 *   - Context Menu (author only)
 *     - Rename folder
 *     - Delete folder
 *     - Create a new note inside
 */
export default function Nav() {
  return (
    <Base.Root>
      <Section name="recents">
        <RecentsList />
      </Section>
      <Section name="folders" action={<FoldersAction />}>
        <FoldersList />
      </Section>
    </Base.Root>
  );
}

// Sections ***************************************************************************************

function RecentsList() {
  const state = useAppState();
  const list = useRecents(state.notes.data);
  const menu = useMenu('notes');
  const { collapsed } = useCollapsible('sidebar_recents_collapsed');

  return (
    <Base.Section.List.Root>
      {list.map((note) => {
        const active = menu.isSelected(note.id);
        return collapsed && !active ? (
          <Fragment key={note.id} />
        ) : (
          <Base.Section.List.Row
            key={note.id}
            icon={FiFileText}
            active={active}
            activeBg="accent"
            onClick={menu.onSelect(note.id)}
          >
            {note.title}
          </Base.Section.List.Row>
        );
      })}
    </Base.Section.List.Root>
  );
}

function FoldersAction() {
  const state = useAppState();
  return <>{state.auth.user && <CreateFolderAction />}</>;
}

function FoldersList() {
  const state = useAppState();
  const menu = useMenu('folders');
  const { collapsed } = useCollapsible('sidebar_folders_collapsed');

  return (
    <Base.Section.List.Root>
      {state.folders.data.map((folder) => {
        const active = menu.isSelected(folder.id);
        if (collapsed && !active) {
          return <Fragment key={folder.id} />;
        }
        const row = (
          <Base.Section.List.Row
            icon={FiFolder}
            active={active}
            activeBg="gray"
            count={Object.keys(folder.notes ?? {}).length}
            onClick={menu.onSelect(folder.id)}
          >
            {folder.name}
          </Base.Section.List.Row>
        );
        return (
          <Fragment key={folder.id}>
            {state.auth.user ? <FolderContextMenu id={folder.id}>{row}</FolderContextMenu> : row}
          </Fragment>
        );
      })}
    </Base.Section.List.Root>
  );
}

// Actions ****************************************************************************************

function CreateFolderAction() {
  const ev = useEvents();
  return <Actions.Action label="Create a new folder" icon={FiPlus} onClick={ev.onCreateFolder} />;
}

function ToggleAction({ name }: ToggleActionProps) {
  const { collapsed, onToggle } = useCollapsible(`sidebar_${name}_collapsed` as const);
  return (
    <Actions.Action
      label={`Toggle ${name}`}
      icon={FiChevronDown}
      onClick={onToggle}
      className="transition-all aria-[pressed]:-rotate-180"
      aria-pressed={ariaAttr(collapsed)}
    />
  );
}

// Context Menus **********************************************************************************

function FolderContextMenu({ children, id }: FolderContextMenuProps) {
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
  const title = getSectionTitle(name);
  return (
    <Base.Section.Root>
      <Base.Section.Header.Root>
        <Base.Section.Header.Heading>{title}</Base.Section.Header.Heading>
        <Actions.Provider size="lg">
          <Actions.Root>
            {action}
            <ToggleAction name={name} />
          </Actions.Root>
        </Actions.Provider>
      </Base.Section.Header.Root>
      <Base.Section.List.Container>{children}</Base.Section.List.Container>
    </Base.Section.Root>
  );
}

// Hooks ******************************************************************************************

function useRecents<T extends { date: string }>(items: T[], max = 3) {
  return useMemo(() => sortDesc(items).slice(0, max), [items, max]);
}

// Utils ******************************************************************************************

function getSectionTitle(name: SectionName) {
  return (
    {
      recents: 'Recents',
      folders: 'Folders',
    } as const
  )[name];
}
