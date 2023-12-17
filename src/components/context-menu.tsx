import {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
  Separator,
  type ContextMenuContentProps,
} from '@/lib/components/context-menu';
import type { Menu } from '@/types';

interface ContextMenuProps extends ContextMenuContentProps {
  children: React.ReactElement;
  items: Menu[];
}

export default function ContextMenu({ children, items, ...rest }: ContextMenuProps) {
  return (
    <Root>
      <Trigger asChild>{children}</Trigger>
      <Portal>
        <Content {...rest}>
          {items.map((el, i) =>
            typeof el === 'string' ? (
              <Separator key={i} />
            ) : (
              <Item key={el.key} disabled={el.disabled} onClick={el.onClick}>
                {el.label}
              </Item>
            ),
          )}
        </Content>
      </Portal>
    </Root>
  );
}
