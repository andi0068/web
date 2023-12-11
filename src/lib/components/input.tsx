'use client';
import { useMemo, useContext, createContext } from 'react';
import { cva } from 'class-variance-authority';

import forwardRef from '@/lib/forward-ref';
import { cn, dataAttr, ariaAttr } from '@/lib/utils';

export type InputVariant = 'filled' | 'outline' | 'none';
export type InputSize = 'base' | 'none';

export interface InputOptions {
  /**
   * @default 'filled'
   */
  variant?: InputVariant;
  /**
   * @default 'base'
   */
  size?: InputSize;
}
export interface BaseInputProps extends InputOptions {
  className?: string;
  isInvalid?: boolean;
}
export interface InputProps
  extends BaseInputProps,
    Omit<React.ComponentPropsWithRef<'input'>, 'size'> {
  as?: React.ElementType;
}

export const INPUT_DEFAULTS: Required<InputOptions> = {
  variant: 'filled',
  size: 'base',
};

const getInputClassName = cva(
  [
    'w-full outline-none bg-transparent',
    'border border-transparent rounded transition-colors placeholder:text-foreground-secondary',
    'focus:border-blue focus:bg-transparent',
    'aria-[invalid]:border-red aria-[invalid]:focus:border-blue',
  ],
  {
    variants: {
      variant: {
        filled: 'text-foreground-primary bg-fill-quaternary',
        outline: 'border-separator text-foreground-primary bg-transparent',
        none: undefined,
      },
      size: {
        base: ['px-[.875rem] h-10 text-sm', 'data-[prefix]:pl-9 data-[suffix]:pr-9'],
        none: undefined,
      },
    },
  },
);

const getIconClassName = cva(
  ['shrink-0 absolute top-1/2 -translate-y-1/2 inset-x-0', 'text-foreground-secondary'],
  {
    variants: {
      size: {
        base: 'inset-x-[.875rem] text-sm',
        none: undefined,
      },
    },
  },
);

const Input = forwardRef<BaseInputProps, 'input'>(
  (
    {
      as: As = 'input',
      className,
      variant = INPUT_DEFAULTS.variant,
      size = INPUT_DEFAULTS.size,
      isInvalid,
      ...rest
    },
    ref,
  ) => {
    const ctx = useInputContext();
    return (
      <As
        ref={ref}
        type="text"
        spellCheck={false}
        className={cn(
          getInputClassName({
            variant: ctx.variant ?? variant,
            size: ctx.size ?? size,
            className,
          }),
        )}
        data-prefix={dataAttr(!!ctx.leftIcon)}
        data-suffix={dataAttr(!!ctx.rightIcon)}
        aria-invalid={ariaAttr(isInvalid)}
        {...rest}
      />
    );
  },
);

export { Input as Control };
export default Input;

// Components *************************************************************************************

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}

export type InputContainerProps = UseInputProps & BaseProps;
export interface InputIconProps {
  className?: string;
}

export function Root({ children, className, ...rest }: InputContainerProps) {
  const input = useInput(rest);
  return (
    <Context.Provider value={input}>
      <div className={cn('relative w-full h-fit', className)}>{children}</div>
    </Context.Provider>
  );
}

export function IconStart({ className }: InputIconProps) {
  const { leftIcon } = useInputContext();
  return <Icon className={cn('right-[unset]', className)}>{leftIcon}</Icon>;
}

export function IconEnd({ className }: InputIconProps) {
  const { rightIcon } = useInputContext();
  return <Icon className={cn('left-[unset]', className)}>{rightIcon}</Icon>;
}

function Icon({ children, className }: BaseProps) {
  const { size } = useInputContext();
  return <span className={cn(getIconClassName({ size, className }))}>{children}</span>;
}

// Context ****************************************************************************************

interface UseInputProps extends InputOptions {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}

function useInput({
  variant = INPUT_DEFAULTS.variant,
  size = INPUT_DEFAULTS.size,
  leftIcon,
  rightIcon,
}: UseInputProps) {
  return useMemo(
    () => ({ variant, size, leftIcon, rightIcon }),
    [variant, size, leftIcon, rightIcon],
  );
}

type UseInputReturn = ReturnType<typeof useInput>;

const Context = createContext({} as UseInputReturn);

function useInputContext() {
  return useContext(Context);
}
