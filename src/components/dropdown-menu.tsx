import { Fragment } from 'react';

import {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
  Separator,
  Sub,
  SubTrigger,
  SubContent,
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
            ) : el.sub ? (
              <Fragment key={el.key}>
                {el.sub.length ? (
                  <Sub>
                    <SubTrigger disabled={el.disabled}>{el.label}</SubTrigger>
                    <Portal>
                      <SubContent>
                        {el.sub.map((subEl) => (
                          <Item key={subEl.key} disabled={subEl.disabled} onClick={subEl.onClick}>
                            {subEl.label}
                          </Item>
                        ))}
                      </SubContent>
                    </Portal>
                  </Sub>
                ) : null}
              </Fragment>
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
