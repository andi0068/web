'use client';
import { useMemo, useContext, forwardRef, createContext } from 'react';
import * as Toast from '@radix-ui/react-toast';

import useIdCreator from '@/lib/hooks/use-id-creator';
import useMap from '@/lib/hooks/use-map';
import { cn } from '@/lib/utils';

import styles from './toast.module.css';

export interface ToastProviderProps {
  children?: React.ReactNode;
}
export interface ToastManagerState {
  children(manager: UseManagerReturn): React.ReactElement;
}

export function Provider({ children }: ToastProviderProps) {
  const manager = useManager();
  return (
    <ManagerContext.Provider value={manager}>
      <Toast.Provider swipeDirection="down">{children}</Toast.Provider>
    </ManagerContext.Provider>
  );
}

export const Root = forwardRef<HTMLLIElement, Toast.ToastProps>(
  ({ children, className, ...rest }, ref) => (
    <Toast.Root
      ref={ref}
      className={cn(
        'text-center font-medium rounded text-neutral-900 bg-white shadow-2xl',
        'py-3 px-4',
        styles.toast,
        className,
      )}
      {...rest}
    >
      {children}
    </Toast.Root>
  ),
);

export const Viewport = forwardRef<HTMLOListElement, Toast.ToastViewportProps>(
  ({ children, className, ...rest }, ref) => (
    <Toast.Viewport
      ref={ref}
      className={cn(
        'fixed bottom-0 left-1/2 -translate-x-1/2 z-toast flex flex-col items-center',
        'p-6 w-80 max-w-[100vw] space-y-[.625rem]',
        className,
      )}
      {...rest}
    >
      {children}
    </Toast.Viewport>
  ),
);

export { type ToastProps, type ToastViewportProps } from '@radix-ui/react-toast';

// Hooks ******************************************************************************************

type ContentMapValue = {
  id: string;
  open: boolean;
  content: string;
  onOpenChange(open: boolean): void;
};

interface CreateContentProps {
  open: boolean;
  content: string;
}

function useManager() {
  const { map, contents, forceUpdate } = useMap<ContentMapValue>();
  const createId = useIdCreator();

  function open(content: string) {
    set(createId(), { open: true, content });
  }

  function set(id: string, props: CreateContentProps) {
    map.set(id, {
      id,
      ...props,
      onOpenChange(open) {
        set(id, { ...props, open });
      },
    });

    forceUpdate({});
  }

  return useMemo(() => ({ contents, open } as const), [contents]);
}

type UseManagerReturn = ReturnType<typeof useManager>;

// Context ****************************************************************************************

const ManagerContext = createContext({} as UseManagerReturn);

function useManagerContext() {
  return useContext(ManagerContext);
}

export function useToast() {
  return useManagerContext().open;
}

export function ManagerState({ children }: ToastManagerState) {
  const manager = useManagerContext();
  return children(manager);
}
