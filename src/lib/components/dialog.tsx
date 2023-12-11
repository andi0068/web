'use client';
import { forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

import CloseButton from './close-button';
import styles from './dialog.module.css';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}

export const Overlay = forwardRef<HTMLDivElement, Dialog.DialogOverlayProps>(
  ({ className, ...rest }, ref) => (
    <Dialog.Overlay
      ref={ref}
      className={cn('fixed inset-0 z-dialog', 'bg-black/[0.7]', styles.overlay, className)}
      {...rest}
    />
  ),
);

export function ContentContainer({ children, className }: BaseProps) {
  return (
    <div
      className={cn('fixed inset-0 z-dialog flex flex-col items-center justify-start', className)}
    >
      {children}
    </div>
  );
}

export const Content = forwardRef<HTMLDivElement, Dialog.DialogContentProps>(
  ({ children, className, ...rest }, ref) => (
    <Dialog.Content
      ref={ref}
      className={cn(
        'overflow-hidden flex flex-col',
        'rounded bg-background-secondary',
        'my-16 w-[28rem] max-w-full',
        styles.content,
        className,
      )}
      {...rest}
    >
      {children}
    </Dialog.Content>
  ),
);

export function Header({ children, className }: BaseProps) {
  return <div className={cn('flex justify-between', 'p-6 pb-2', className)}>{children}</div>;
}

export const Title = forwardRef<HTMLHeadingElement, Dialog.DialogTitleProps>(
  ({ children, className, ...rest }, ref) => (
    <Dialog.Title
      ref={ref}
      className={cn('text-2xl leading-none font-semibold', className)}
      {...rest}
    >
      {children}
    </Dialog.Title>
  ),
);

export const Close = forwardRef<HTMLButtonElement, Dialog.DialogCloseProps>(
  ({ children, className, asChild, ...rest }, ref) => (
    <Dialog.Close ref={ref} asChild {...rest}>
      {asChild ? (
        children
      ) : (
        <span className="shrink-0 relative w-6">
          <CloseButton className={cn('absolute -top-1 -right-2', className)}>
            {children}
          </CloseButton>
        </span>
      )}
    </Dialog.Close>
  ),
);

export function Body({ children, className }: BaseProps) {
  return <div className={cn('overflow-y-auto', 'pt-2 px-6', className)}>{children}</div>;
}

export function Footer({ children, className }: BaseProps) {
  return <div className={cn('flex justify-end', 'p-6 space-x-4', className)}>{children}</div>;
}

export {
  Root,
  Trigger,
  Portal,
  type DialogProps,
  type DialogTriggerProps,
  type DialogPortalProps,
  type DialogOverlayProps,
  type DialogContentProps,
  type DialogTitleProps,
  type DialogCloseProps,
} from '@radix-ui/react-dialog';
