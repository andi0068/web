'use client';
import { useMemo, useContext, createContext } from 'react';

import useClientConfig, { type UseClientConfigReturn } from '@/lib/hooks/use-client-config';
import { STATE_CLIENT_CONFIG_KEY } from '@/config/constants';
import type { StateClientConfig } from '@/types';

interface ProviderProps {
  children?: React.ReactNode;
}

const Context = createContext<UseClientConfigReturn<StateClientConfig>>({
  value: {},
  update() {},
});

export function useStateConfigContext() {
  return useContext(Context);
}

export function Provider({ children }: ProviderProps) {
  const config = useClientConfig<StateClientConfig>({
    key: STATE_CLIENT_CONFIG_KEY,
  });

  const value = useMemo(
    () => ({ ...config }),
    [config.value.folders_selected_id, config.value.notes_selected_id],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
