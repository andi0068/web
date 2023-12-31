'use client';
import { useMemo } from 'react';
import { FiMenu } from 'react-icons/fi';

import DropdownMenu from '@/components/dropdown-menu';
import { useAppState } from '@/context';
import { useMenuFactory } from '@/hooks';
import { siteConfig } from '@/config/site';
import type { Menu } from '@/types';

import * as Base from './view/header';

import { useEvents } from './_hooks';

/**
 * Features
 * - Actions
 *   - "Options" with Dropdown Menu
 *     - Login or Logout
 */
export default function NavHeader() {
  return (
    <Base.Root>
      <Base.Heading as="h1">{siteConfig.name}</Base.Heading>
      <Base.Actions.Root>
        <OptionsAction />
      </Base.Actions.Root>
    </Base.Root>
  );
}

// Actions ****************************************************************************************

function OptionsAction() {
  return (
    <OptionsDropdownMenu>
      <Base.Actions.Action label="Options" icon={FiMenu} />
    </OptionsDropdownMenu>
  );
}

// Dropdown Menus *********************************************************************************

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
