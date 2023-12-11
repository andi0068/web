import { cva } from 'class-variance-authority';

import forwardRef from '@/lib/forward-ref';
import { cn } from '@/lib/utils';

import Button, { BUTTON_DEFAULTS, type BaseButtonProps } from './button';

interface BaseIconButtonProps extends BaseButtonProps {
  icon: React.ReactElement;
}

const getClassName = cva('px-0 rounded-full', {
  variants: {
    variant: {
      filled: undefined,
      plain: [
        'data-[color="gray"]:text-foreground-secondary data-[color="gray"]:hover:text-foreground-primary',
      ],
      none: undefined,
    },
    size: {
      base: 'text-lg',
      none: undefined,
    },
  },
});

const IconButton = forwardRef<BaseIconButtonProps, 'button'>(
  (
    { className, icon, variant = BUTTON_DEFAULTS.variant, size = BUTTON_DEFAULTS.size, ...rest },
    ref,
  ) => (
    <Button
      ref={ref}
      className={cn(getClassName({ variant, size, className }))}
      variant={variant}
      size={size}
      {...rest}
    >
      {icon}
    </Button>
  ),
);

export default IconButton;
