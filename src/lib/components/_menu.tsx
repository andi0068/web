import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import Button from './button';
import Icon from './icon';

function CONTENT_CLASS(className?: string) {
  return cn(
    'scroll-view overflow-y-auto z-menu flex flex-col',
    'border border-separator rounded bg-background-tertiary shadow-2xl',
    'p-1 min-w-[10rem] max-h-screen',
    className,
  );
}

function ITEM_CLASS(className?: string) {
  return cn(
    'justify-between',
    'font-normal outline-none rounded-sm transition-none before:transition-none focus-visible:outline-0 focus:bg-fill-quaternary',
    'px-3 h-10 text-sm',
    className,
  );
}

export const Content = forwardRef<HTMLDivElement, React.ComponentPropsWithRef<'div'>>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} className={CONTENT_CLASS(className)} {...rest}>
      {children}
    </div>
  ),
);

export const Item = forwardRef<HTMLButtonElement, React.ComponentPropsWithRef<'button'>>(
  ({ children, className, ...rest }, ref) => (
    <Button ref={ref} variant="none" size="none" className={ITEM_CLASS(className)} {...rest}>
      {children}
    </Button>
  ),
);

export const SubTrigger = forwardRef<HTMLDivElement, React.ComponentPropsWithRef<'div'>>(
  ({ children, className, ...rest }, ref) => (
    <Button
      as="div"
      ref={ref}
      variant="none"
      size="none"
      className={ITEM_CLASS(className)}
      {...rest}
    >
      {children}
      <Icon as={ArrowUp} className="fill-current rotate-90" />
    </Button>
  ),
);

export const Separator = forwardRef<HTMLDivElement, React.ComponentPropsWithRef<'div'>>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} className={cn('border-t border-separator', className)} {...rest} />
  ),
);

function ArrowUp(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg height="16" width="16" viewBox="0 0 16 16" {...props}>
      <path d="M14 10 8 4l-6 6h12z" />
    </svg>
  );
}
