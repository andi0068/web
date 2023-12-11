import {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
  Separator,
  type DropdownMenuContentProps,
} from '@/lib/components/dropdown-menu';
import type { Menu } from '@/types';

interface DropdownMenuProps extends DropdownMenuContentProps {
  children: React.ReactElement;
  items: Menu[];
}

export default function DropdownMenu({ children, items, ...rest }: DropdownMenuProps) {
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
