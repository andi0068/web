'use client';
import { forwardRef } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';

import * as Menu from './_menu';

export const Content = forwardRef<HTMLDivElement, ContextMenu.ContextMenuContentProps>(
  ({ children, className, asChild: _asChild, ...rest }, ref) => (
    <ContextMenu.Content ref={ref} asChild {...rest}>
      <Menu.Content className={className}>{children}</Menu.Content>
    </ContextMenu.Content>
  ),
);

export const Item = forwardRef<HTMLDivElement, ContextMenu.ContextMenuItemProps>(
  ({ children, className, disabled, asChild: _asChild, ...rest }, ref) => {
    return (
      <ContextMenu.Item ref={ref} asChild {...rest}>
        <Menu.Item className={className} disabled={disabled}>
          {children}
        </Menu.Item>
      </ContextMenu.Item>
    );
  },
);

export const SubTrigger = forwardRef<HTMLDivElement, ContextMenu.ContextMenuSubTriggerProps>(
  ({ children, className, asChild: _asChild, ...rest }, ref) => (
    <ContextMenu.SubTrigger ref={ref} asChild {...rest}>
      <Menu.SubTrigger className={className}>{children}</Menu.SubTrigger>
    </ContextMenu.SubTrigger>
  ),
);

export const SubContent = forwardRef<HTMLDivElement, ContextMenu.ContextMenuSubContentProps>(
  ({ children, className, asChild: _asChild, ...rest }, ref) => (
    <ContextMenu.SubContent ref={ref} asChild {...rest}>
      <Menu.Content className={className}>{children}</Menu.Content>
    </ContextMenu.SubContent>
  ),
);

export const Separator = forwardRef<HTMLDivElement, ContextMenu.ContextMenuSeparatorProps>(
  ({ className, asChild: _asChild, ...rest }, ref) => (
    <ContextMenu.Separator ref={ref} asChild {...rest}>
      <Menu.Separator className={className} />
    </ContextMenu.Separator>
  ),
);

export {
  Root,
  Trigger,
  Portal,
  Sub,
  type ContextMenuProps,
  type ContextMenuTriggerProps,
  type ContextMenuPortalProps,
  type ContextMenuContentProps,
  type ContextMenuItemProps,
  type ContextMenuSubProps,
  type ContextMenuSubTriggerProps,
  type ContextMenuSubContentProps,
  type ContextMenuSeparatorProps,
} from '@radix-ui/react-context-menu';
