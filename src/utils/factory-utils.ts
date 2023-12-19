export interface MenuFactoryProps {
  onLogin?(): void;
  onLogout?(): void;
  onRenameFolder?(): void;
  onDeleteFolder?(): void;
  onCreateNote?(): void;
  onPinNote?(): void;
  onUnpinNote?(): void;
  onDeleteNote?(): void;
}

export function MenuFactory({
  onLogin,
  onLogout,
  onRenameFolder,
  onDeleteFolder,
  onCreateNote,
  onPinNote,
  onUnpinNote,
  onDeleteNote,
}: MenuFactoryProps) {
  const general = {
    no_content: {
      key: 'no_content',
      label: 'No content',
      disabled: true,
    },
    login: {
      key: 'login',
      label: 'Login',
      onClick: onLogin,
    },
    logout: {
      key: 'logout',
      label: 'Log out',
      onClick: onLogout,
    },
  };

  const author = {
    // Folders
    rename_folder: {
      key: 'rename_folder',
      label: 'Rename',
      onClick: onRenameFolder,
    },
    delete_folder: {
      key: 'delete_folder',
      label: 'Delete',
      onClick: onDeleteFolder,
    },
    create_note_inside: {
      key: 'create_note_inside',
      label: 'Create note',
      onClick: onCreateNote,
    },
    // Notes
    pin_note: {
      key: 'pin_note',
      label: 'Pin note',
      onClick: onPinNote,
    },
    unpin_note: {
      key: 'unpin_note',
      label: 'Unpin note',
      onClick: onUnpinNote,
    },
    delete_note: {
      key: 'delete_note',
      label: 'Delete',
      onClick: onDeleteNote,
    },
  };

  return {
    general,
    author,
  } as const;
}
