/* eslint-disable react/no-children-prop */
'use client';
import { useContext, createContext as createReactContext, createElement } from 'react';

interface ProviderProps {
  children?: React.ReactNode;
}

export default function createContext<T extends object>(
  useValue: () => T,
  providerName = 'Provider',
) {
  const Ctx = createReactContext(null as unknown as T);

  const useCtx = () => {
    const value = useContext(Ctx);
    if (value === null) {
      throw Error(`Seems you forgot to wrap the components in "<${providerName} />"`);
    }
    return value;
  };

  const Provider = ({ children }: ProviderProps) => {
    const value = useValue();
    return createElement(Ctx.Provider, { value, children });
  };

  return [Provider, useCtx] as const;
}
