'use client';
import { useCallback } from 'react';

import * as Base from '@/lib/components/dialog';
import Button from '@/lib/components/button';
import useAsyncHandler from '@/lib/hooks/use-async-handler';
import { cn } from '@/lib/utils';

import { useDialogContext } from '../dialog.context';
import type { AlertProps, AboutProps, ButtonMouseEventHandler } from './contents.types';

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

export function About({ entries }: AboutProps) {
  const { title } = useDialogContext();

  const body = (
    <Base.Body>
      {entries.map(([name, value]) => (
        <p
          key={name}
          className={cn(
            'grid',
            'text-sm font-semibold border-b border-separator',
            'grid-cols-4 gap-x-4 py-3',
          )}
        >
          <span className="col-span-1 text-foreground-secondary">{name}</span>
          <span className="col-span-3 underline">{value}</span>
        </p>
      ))}
    </Base.Body>
  );

  return (
    <Base.Content className="rounded-lg">
      <Base.Header>
        <Base.Title>About &ldquo;{title}&rdquo;</Base.Title>
        <Base.Close />
      </Base.Header>
      {body}
      <Base.Footer />
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
