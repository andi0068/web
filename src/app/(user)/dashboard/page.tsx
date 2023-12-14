'use client';
import { useCallback, createElement } from 'react';

import * as App from '@/components/app';
import * as Dialog from '@/components/app/dialog';
import * as Toast from '@/components/app/toast';
import * as Auth from '@/services/auth';
import * as Notes from '@/services/notes';

export default function Dashboard() {
  return (
    <App.Provider
      onCreateNote={Notes.create}
      onUpdateNote={Notes.update}
      onDeleteNote={useDeleteHandler()}
      onLogout={Auth.signOut}
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

function useDeleteHandler() {
  const dialog = Dialog.useDialogContext();
  const toast = Toast.useToast();

  return useCallback(async (params: { id: string }) => {
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
}
