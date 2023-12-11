'use client';
import { useMemo, useCallback, useContext, useId, forwardRef, createContext } from 'react';
import * as Form from '@radix-ui/react-form';
import { cva } from 'class-variance-authority';

import { cn, ariaAttr } from '@/lib/utils';

export type FormSubmitHandler<T extends object = {}> = (
  data: T,
  event: React.FormEvent<HTMLFormElement>,
) => Promise<any> | void;
export type FormFooterDirection = 'auto' | 'row' | 'column';
export type FormFooterJustify = 'start' | 'end';
export type FormFooterSpace = 'top' | 'y';

export interface FormOptions {
  /**
   * @default true
   */
  shouldResetOnSuccess?: boolean;
}
export interface FormProps<T extends object = {}>
  extends FormOptions,
    Omit<Form.FormProps, 'onSubmit'> {
  onSubmit?: FormSubmitHandler<T>;
}
export type FormDescriptionProps = React.ComponentPropsWithRef<'span'>;
export interface FormFooterProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * @default 'auto'
   */
  direction?: FormFooterDirection;
  /**
   * @default 'start'
   */
  justify?: FormFooterJustify;
  /**
   * @default 'top'
   */
  space?: FormFooterSpace;
}
interface UseSubmitHandlerOptions {
  shouldResetOnSuccess?: boolean;
}

const getFooterClassName = cva('flex', {
  variants: {
    direction: {
      auto: 'flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2',
      row: 'flex-row space-x-2',
      column: 'flex-col space-y-2',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
    },
    space: {
      top: 'mt-5',
      y: 'my-5',
    },
  },
});

export const Root = forwardRef<HTMLFormElement, FormProps<any>>(
  ({ children, className, onSubmit: onSubmitProp, shouldResetOnSuccess = true, ...rest }, ref) => {
    const onSubmit = useSubmitHandler(onSubmitProp, { shouldResetOnSuccess });
    return (
      <Form.Root ref={ref} className={cn('flex flex-col', className)} onSubmit={onSubmit} {...rest}>
        {children}
      </Form.Root>
    );
  },
);

export const Field = forwardRef<HTMLDivElement, Form.FormFieldProps>(
  ({ children, className, ...rest }, ref) => {
    const descId = useId();
    const field = useMemo(() => ({ descId }), [descId]);

    return (
      <FieldContext.Provider value={field}>
        <Form.Field
          ref={ref}
          className={cn('flex flex-col', 'mt-4 first-of-type:mt-0 space-y-2', className)}
          {...rest}
        >
          {children}
        </Form.Field>
      </FieldContext.Provider>
    );
  },
);

export const Label = forwardRef<HTMLLabelElement, Form.FormLabelProps>(
  ({ children, className, ...rest }, ref) => (
    <Form.Label
      ref={ref}
      className={cn('inline-block', 'w-fit text-sm font-semibold', className)}
      {...rest}
    >
      {children}
    </Form.Label>
  ),
);

export const Control = forwardRef<HTMLInputElement, Form.FormControlProps>(
  ({ children, className, ...rest }, ref) => {
    const { descId } = useFieldContext();
    return (
      <Form.ValidityState>
        {(validity) => (
          <Form.Control
            ref={ref}
            className={className}
            aria-describedby={descId}
            aria-invalid={ariaAttr(validity && !validity.valid)}
            {...rest}
          >
            {children}
          </Form.Control>
        )}
      </Form.ValidityState>
    );
  },
);

export const Description = forwardRef<HTMLSpanElement, FormDescriptionProps>(
  ({ children, className, id: _id, ...rest }, ref) => {
    const { descId } = useFieldContext();
    return (
      <span
        ref={ref}
        id={descId}
        className={cn('block', 'text-xs text-foreground-secondary', className)}
        {...rest}
      >
        {children}
      </span>
    );
  },
);

export const Message = forwardRef<HTMLSpanElement, Form.FormMessageProps>(
  ({ children, className, ...rest }, ref) => (
    <Form.Message
      ref={ref}
      role="alert"
      className={cn('block', 'text-xs text-red', className)}
      {...rest}
    >
      {children}
    </Form.Message>
  ),
);

export const Footer = forwardRef<HTMLDivElement, FormFooterProps>(
  ({ children, className, direction = 'auto', justify = 'start', space = 'top', ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(getFooterClassName({ direction, justify, space, className }))}
      {...rest}
    >
      {children}
    </div>
  ),
);

function useSubmitHandler<T extends object = {}>(
  handler?: FormSubmitHandler<T>,
  { shouldResetOnSuccess }: UseSubmitHandlerOptions = {},
) {
  return useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = Object.fromEntries(new FormData(form));

      try {
        await handler?.(data as T, event);
        if (shouldResetOnSuccess) form.reset();
      } catch (err) {
        console.error(err);
      }
    },
    [handler, shouldResetOnSuccess],
  );
}

export {
  type FormFieldProps,
  type FormLabelProps,
  type FormControlProps,
  type FormMessageProps,
} from '@radix-ui/react-form';

// Context ****************************************************************************************

type FieldContextType = {
  descId: string;
};

const FieldContext = createContext({} as FieldContextType);

function useFieldContext() {
  return useContext(FieldContext);
}
