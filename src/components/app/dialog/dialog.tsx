'use client';
import { useCallback } from 'react';

import * as Base from '@/lib/components/dialog';

import { useDialogContext } from './dialog.context';

export function Viewport() {
  const { isOpen, content, close } = useDialogContext();
  const onOpenChange = useCallback(close, []);

  return isOpen ? (
    <Base.Root open={isOpen} onOpenChange={onOpenChange}>
      <Base.Overlay className="absolute" />
      <Base.ContentContainer className="absolute">{content}</Base.ContentContainer>
    </Base.Root>
  ) : (
    <></>
  );
}

export * as Contents from './contents';
export { Provider, useDialogContext } from './dialog.context';
