'use client';
import * as AppConfig from '@/context/app-config';

import { HandlersProvider, type HandlersProviderProps } from './_context';

interface ProviderProps extends HandlersProviderProps {
  children?: React.ReactNode;
}

export function Provider({
  children,
  onLogin,
  onLogout,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
}: ProviderProps) {
  return (
    <AppConfig.Provider>
      <HandlersProvider
        onLogin={onLogin}
        onLogout={onLogout}
        onCreateFolder={onCreateFolder}
        onRenameFolder={onRenameFolder}
        onDeleteFolder={onDeleteFolder}
        onCreateNote={onCreateNote}
        onUpdateNote={onUpdateNote}
        onDeleteNote={onDeleteNote}
      >
        {children}
      </HandlersProvider>
    </AppConfig.Provider>
  );
}
