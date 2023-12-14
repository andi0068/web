'use client';
import { useCallback } from 'react';
import { FiFolder } from 'react-icons/fi';

import * as ContextMenu from '@/lib/components/context-menu';
import { useAppState, useAppDispatch } from '@/context';

import { useEvents } from '.';
import * as Base from './side-view/nav';

// TODO
export default function Nav() {
  const state = useAppState();
  const ev = useEvents();
  const menu = useMenu();

  return (
    <Base.Root>
      <Base.Section.Root>
        <Base.Section.Header.Root>
          <Base.Section.Header.Heading>Folders</Base.Section.Header.Heading>
        </Base.Section.Header.Root>
        <Base.Section.List.Container>
          <Base.Section.List.Root>
            {state.folders.data.map((folder) => (
              <ContextMenu.Root key={folder.id}>
                <ContextMenu.Trigger asChild>
                  <Base.Section.List.Row
                    icon={FiFolder}
                    active={menu.isActive(folder.id)}
                    onClick={menu.onSelect(folder.id)}
                  >
                    {folder.name}
                  </Base.Section.List.Row>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Content>
                    <ContextMenu.Item onClick={() => ev.onRenameFolder?.({ id: folder.id })}>
                      Rename
                    </ContextMenu.Item>
                    <ContextMenu.Item onClick={() => ev.onDeleteFolder?.({ id: folder.id })}>
                      Delete
                    </ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Item>Create note</ContextMenu.Item>
                  </ContextMenu.Content>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            ))}
          </Base.Section.List.Root>
        </Base.Section.List.Container>
      </Base.Section.Root>
    </Base.Root>
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
