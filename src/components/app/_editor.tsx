'use client';
import { useAppState } from '@/context';

import { useEvents } from '.';
import * as Base from './editor-view/editor';

/**
 * Features
 * - Edit and save (author only)
 */
export default function Editor() {
  const state = useAppState();
  const ev = useEvents();

  if (!state.selected) {
    throw Error('Please unmount it component, while state.selected is null or undefined.');
  }

  const selected = state.selected!;
  const readOnly = !state.auth.user;

  return (
    <Base.Root>
      <Base.Header.Root>
        <Base.Header.Heading
          required
          readOnly={readOnly}
          onChange={(title) => ev.onUpdate?.({ id: selected.id }, { title })}
        >
          {selected.title}
        </Base.Header.Heading>
      </Base.Header.Root>
      <Base.TextEdit
        value={selected.content}
        readOnly={readOnly}
        onChange={(content) => ev.onUpdate?.({ id: selected.id }, { content })}
      />
    </Base.Root>
  );
}
