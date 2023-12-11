import { cva } from 'class-variance-authority';

import forwardRef from '@/lib/forward-ref';
import { cn } from '@/lib/utils';

export type ButtonColorScheme = 'accent' | 'gray';
export type ButtonVariant = 'filled' | 'plain' | 'none';
export type ButtonSize = 'base' | 'none';

export interface ButtonOptions {
  /**
   * @default 'accent'
   */
  colorScheme?: ButtonColorScheme;
  /**
   * @default 'filled'
   */
  variant?: ButtonVariant;
  /**
   * @default 'base'
   */
  size?: ButtonSize;
}
export interface BaseButtonProps extends ButtonOptions {
  children?: React.ReactNode;
  className?: string;
}
export interface ButtonProps extends BaseButtonProps, React.ComponentPropsWithRef<'button'> {
  as?: React.ElementType;
}

export const BUTTON_DEFAULTS: Required<ButtonOptions> = {
  colorScheme: 'accent',
  variant: 'filled',
  size: 'base',
};

const getClassName = cva(
  [
    'shrink-0 overflow-hidden relative inline-flex items-center justify-center whitespace-nowrap select-none before:absolute before:inset-0',
    'font-semibold outline-none rounded transition-colors disabled:opacity-60 focus-visible:outline focus-visible:outline-offset-0 focus-visible:outline-separator',
    'before:opacity-0 before:bg-current before:transition-opacity hover:before:opacity-5 active:before:opacity-0',
  ],
  {
    variants: {
      variant: {
        filled: [
          'data-[color="accent"]:text-white data-[color="accent"]:bg-accent',
          'data-[color="gray"]:text-foreground-primary data-[color="gray"]:bg-fill-quaternary',
        ],
        plain: [
          'data-[color="accent"]:text-accent',
          'data-[color="gray"]:text-foreground-primary',
          'bg-transparent',
        ],
        none: undefined,
      },
      size: {
        base: 'px-5 min-w-[2.5rem] h-10 text-sm',
        none: undefined,
      },
    },
  },
);

const Button = forwardRef<BaseButtonProps, 'button'>(
  (
    {
      as: As = 'button',
      children,
      className,
      colorScheme = BUTTON_DEFAULTS.colorScheme,
      variant = BUTTON_DEFAULTS.variant,
      size = BUTTON_DEFAULTS.size,
      ...rest
    },
    ref,
  ) => (
    <As
      ref={ref}
      type="button"
      className={cn(getClassName({ variant, size, className }))}
      data-color={colorScheme}
      {...rest}
    >
      {children}
    </As>
  ),
);

export { Button as Root };
export default Button;

// Components *************************************************************************************

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}
export interface ButtonIconProps {
  icon: React.ReactElement;
  className?: string;
}

export function IconStart({ className, icon }: ButtonIconProps) {
  return <Icon className={cn('mr-2', className)}>{icon}</Icon>;
}

export function IconEnd({ className, icon }: ButtonIconProps) {
  return <Icon className={cn('ml-2', className)}>{icon}</Icon>;
}

function Icon({ children, className }: BaseProps) {
  return <span className={cn('shrink-0', className)}>{children}</span>;
}
