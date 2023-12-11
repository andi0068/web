'use client';
import useDialog from '@/lib/hooks/use-dialog';
import createContext from '@/lib/create-context';

export const [Provider, useDialogContext] = createContext(useDialog, 'Dialog.Provider');
