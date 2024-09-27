import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/shared/utils/tw';
import type { BaseProps, WithClassProp } from '@/shared/types';

interface ImageProps {
  element: React.ReactElement;
}

export function Root({ children }: BaseProps) {
  return <header className="mb-[1.875rem]">{children}</header>;
}

export function TopContent({ children }: BaseProps) {
  return <div className="flex items-center justify-between py-9">{children}</div>;
}

export function BottomContent({ children }: BaseProps) {
  return <div className="mt-1.5">{children}</div>;
}

export function Image({ element }: ImageProps) {
  const props = {
    width: 64,
    height: 64,
    sizes: '64px',
  };
  return (
    <Slot className="object-cover size-16 rounded-full bg-background-secondary" {...props}>
      {element}
    </Slot>
  );
}

export function Location({ children, className }: WithClassProp<BaseProps>) {
  return <p className={cn('uppercase text-sm text-foreground-secondary', className)}>{children}</p>;
}

export function Title({ children, className, as: As }: WithClassProp<BaseProps> & { as?: 'p' }) {
  const Comp = As || 'h1';
  return (
    <Comp className={cn('text-4xl -tracking-[.02em] leading-[2.625rem] font-medium', className)}>
      {children}
    </Comp>
  );
}

export function Description({ children }: BaseProps) {
  return (
    <Title as="p" className="text-foreground-secondary">
      {children}
    </Title>
  );
}
