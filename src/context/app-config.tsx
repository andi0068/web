'use client';
import { useMemo, useContext, createContext } from 'react';

import useClientConfig, { type UseClientConfigReturn } from '@/lib/hooks/use-client-config';
import { APP_CLIENT_CONFIG_KEY } from '@/config/constants';
import type { AppClientConfig } from '@/types';

interface ProviderProps {
  children?: React.ReactNode;
}

const Context = createContext<UseClientConfigReturn<AppClientConfig>>({
  value: {},
  update() {},
});

export function useAppConfigContext() {
  return useContext(Context);
}

export function Provider({ children }: ProviderProps) {
  const config = useClientConfig<AppClientConfig>({
    key: APP_CLIENT_CONFIG_KEY,
  });

  const value = useMemo(
    () => ({ ...config }),
    [
      config.value.sidebar_collapsed,
      config.value.sidebar_recents_collapsed,
      config.value.sidebar_folders_collapsed,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
