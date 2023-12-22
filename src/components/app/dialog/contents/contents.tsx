'use client';
import { useCallback, forwardRef } from 'react';

import * as Base from '@/lib/components/dialog';
import * as RootForm from '@/lib/components/form';
import Button from '@/lib/components/button';
import useAsyncHandler from '@/lib/hooks/use-async-handler';

import { useDialogContext } from '../dialog.context';
import type { FormProps, AlertProps, ButtonMouseEventHandler } from './contents.types';

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, onSubmit: onSubmitProp, button, ...rest }, ref) => {
    const { title } = useDialogContext();
    const [loading, onSubmit] = useAsyncHandler(onSubmitProp);

    return (
      <Base.Content role="dialog" className="rounded-lg">
        <Base.Header>
          <Base.Title>{title}</Base.Title>
          <Base.Close />
        </Base.Header>
        <RootForm.Root ref={ref} onSubmit={onSubmit} {...rest}>
          <Base.Body>{children}</Base.Body>
          <Base.Footer>
            <Button type="submit" disabled={loading} className="rounded-md">
              {button.label}
            </Button>
          </Base.Footer>
        </RootForm.Root>
      </Base.Content>
    );
  },
);

export function Alert({ button }: AlertProps) {
  const { title, close } = useDialogContext();
  const { loading, onConfirm } = useConfirmHandler(button.onClick);
  const onCancel = useCallback(close, []);

  return (
    <Base.Content role="alertdialog" className="rounded-lg">
      <Base.Header>
        <Base.Title>{title}</Base.Title>
      </Base.Header>
      <Base.Footer>
        <Button colorScheme="gray" variant="plain" onClick={onCancel} className="rounded-md">
          Cancel
        </Button>
        <Button disabled={loading} onClick={onConfirm} className="rounded-md">
          {button.label}
        </Button>
      </Base.Footer>
    </Base.Content>
  );
}

function useConfirmHandler<T = HTMLButtonElement>(handler?: ButtonMouseEventHandler<T>) {
  const { close } = useDialogContext();
  const confirmHandler = useCallback(
    async (event: React.MouseEvent<T>) => handler?.(event).then(close),
    [handler],
  );
  const [loading, onConfirm] = useAsyncHandler(confirmHandler);

  return {
    loading,
    onConfirm,
  } as const;
}

export type * from './contents.types';
