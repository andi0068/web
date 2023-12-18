'use client';
import { useMemo } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import DropdownMenu from '@/components/dropdown-menu';
import { useAppState } from '@/context';
import { useMenuFactory } from '@/hooks';
import type { Menu } from '@/types';

import { useEvents } from '.';
import * as Base from './view/header';

export default function NavHeader() {
  return (
    <Base.Root>
      <Base.Heading as="h1">Collections</Base.Heading>
      <Base.Actions.Root>
        <OptionsDropdownMenu>
          <Base.Actions.Action label="Options" icon={FiChevronDown} />
        </OptionsDropdownMenu>
      </Base.Actions.Root>
    </Base.Root>
  );
}

function OptionsDropdownMenu({ children }: { children: React.ReactElement }) {
  const state = useAppState();
  const ev = useEvents();
  const factory = useMenuFactory(
    {
      onLogin: ev.onLogin,
      onLogout: ev.onLogout,
    },
    [ev.onLogin, ev.onLogout],
  );

  const items = useMemo((): Menu[] => {
    if (state.auth.user) {
      return [factory.general.logout];
    }
    return [factory.general.login];
  }, [state.auth.user, factory]);

  return (
    <DropdownMenu align="center" items={items}>
      {children}
    </DropdownMenu>
  );
}
