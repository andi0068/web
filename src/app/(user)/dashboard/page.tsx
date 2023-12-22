/* eslint-disable react/no-children-prop */
'use client';
import { useCallback, createElement } from 'react';

import * as Form from '@/lib/components/form';
import Input from '@/lib/components/input';
import * as App from '@/components/app';
import * as Dialog from '@/components/app/dialog';
import * as Toast from '@/components/app/toast';
import * as Auth from '@/services/auth';
import * as Folders from '@/services/folders';
import * as Notes from '@/services/notes';
import type { Folder } from '@/types';

export default function Dashboard() {
  const {
    onCreateFolder,
    onRenameFolder,
    onDeleteFolder,
    onCreateNote,
    onUpdateNote,
    onDeleteNote,
    onLogout,
  } = useEvents();
  return (
    <App.Provider
      onCreateFolder={onCreateFolder}
      onRenameFolder={onRenameFolder}
      onDeleteFolder={onDeleteFolder}
      onCreateNote={onCreateNote}
      onUpdateNote={onUpdateNote}
      onDeleteNote={onDeleteNote}
      onLogout={onLogout}
    >
      <App.Root>
        <App.Content>
          <Dialog.Viewport />
          <Toast.Viewport />
        </App.Content>
      </App.Root>
    </App.Provider>
  );
}

function RenameFolderFormField({ name }: { name: string }) {
  return (
    <Form.Field name="name">
      <Form.Control asChild>
        <Input placeholder="Add a name" defaultValue={name} autoComplete="off" required />
      </Form.Control>
      <Form.Message match="valueMissing">Name can&apos;t be blank</Form.Message>
    </Form.Field>
  );
}

function useEvents() {
  const dialog = Dialog.useDialogContext();
  const toast = Toast.useToast();

  const onRenameFolder = useCallback((params: Folder) => {
    dialog.open({
      title: 'Rename',
      content: createElement(Dialog.Contents.Form, {
        children: createElement(RenameFolderFormField, { name: params.name }),
        button: { label: 'Save' },
        async onSubmit(data: {}) {
          await Folders.update({ id: params.id }, data);
          dialog.close();
        },
      }),
    });
  }, []);

  const onDeleteFolder = useCallback(async (params: { id: string }) => {
    dialog.open({
      title: 'Do you really want to delete this folder and all notes inside?',
      content: createElement(Dialog.Contents.Alert, {
        button: {
          label: 'Delete',
          async onClick() {
            await Folders.remove(params);
            toast('Deleted from Folders.');
          },
        },
      }),
    });
  }, []);

  const onDeleteNote = useCallback(async (params: { id: string }) => {
    dialog.open({
      title: 'Do you really want to delete this note?',
      content: createElement(Dialog.Contents.Alert, {
        button: {
          label: 'Delete',
          async onClick() {
            await Notes.remove(params);
            toast('Deleted from Notes.');
          },
        },
      }),
    });
  }, []);

  return {
    onCreateFolder: Folders.create,
    onRenameFolder,
    onDeleteFolder,
    onCreateNote: Notes.create,
    onUpdateNote: Notes.update,
    onDeleteNote,
    onLogout: Auth.signOut,
  } as const;
}
