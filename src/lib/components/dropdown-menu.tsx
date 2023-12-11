'use client';
import { forwardRef } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import * as Menu from './_menu';

export const Content = forwardRef<HTMLDivElement, DropdownMenu.DropdownMenuContentProps>(
  ({ children, className, asChild: _asChild, sideOffset = 8, ...rest }, ref) => (
    <DropdownMenu.Content ref={ref} asChild sideOffset={sideOffset} {...rest}>
      <Menu.Content className={className}>{children}</Menu.Content>
    </DropdownMenu.Content>
  ),
);

export const Item = forwardRef<HTMLDivElement, DropdownMenu.DropdownMenuItemProps>(
  ({ children, className, disabled, asChild: _asChild, ...rest }, ref) => {
    return (
      <DropdownMenu.Item ref={ref} asChild {...rest}>
        <Menu.Item className={className} disabled={disabled}>
          {children}
        </Menu.Item>
      </DropdownMenu.Item>
    );
  },
);

export const SubTrigger = forwardRef<HTMLDivElement, DropdownMenu.DropdownMenuSubTriggerProps>(
  ({ children, className, asChild: _asChild, ...rest }, ref) => (
    <DropdownMenu.SubTrigger ref={ref} asChild {...rest}>
      <Menu.SubTrigger className={className}>{children}</Menu.SubTrigger>
    </DropdownMenu.SubTrigger>
  ),
);

export const SubContent = forwardRef<HTMLDivElement, DropdownMenu.DropdownMenuSubContentProps>(
  ({ children, className, asChild: _asChild, ...rest }, ref) => (
    <DropdownMenu.SubContent ref={ref} asChild {...rest}>
      <Menu.Content className={className}>{children}</Menu.Content>
    </DropdownMenu.SubContent>
  ),
);

export const Separator = forwardRef<HTMLDivElement, DropdownMenu.DropdownMenuSeparatorProps>(
  ({ className, asChild: _asChild, ...rest }, ref) => (
    <DropdownMenu.Separator ref={ref} asChild {...rest}>
      <Menu.Separator className={className} />
    </DropdownMenu.Separator>
  ),
);

export {
  Root,
  Trigger,
  Portal,
  Sub,
  type DropdownMenuProps,
  type DropdownMenuTriggerProps,
  type DropdownMenuPortalProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuSubProps,
  type DropdownMenuSubTriggerProps,
  type DropdownMenuSubContentProps,
  type DropdownMenuSeparatorProps,
} from '@radix-ui/react-dropdown-menu';
