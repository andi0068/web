import { useEffect } from 'react';
import * as mod from 'firebase/database';

import { createId, createDate } from '@/utils/services-utils';
import type { NotesRecord, Note } from '@/types';

import { APP } from './firebase';

export type CreateParams = {
  folder_id: string;
};

export type UpdateParams = {
  id: string;
};
export type UpdateData = {
  folder_id?: string;
  title?: string;
  content?: string;
  pinned?: boolean;
};

export type RemoveParams = {
  id: string;
};

const DB = mod.getDatabase(APP);
const REF_PATH = '/notes';
const REFS = {
  root() {
    return mod.ref(DB, REF_PATH);
  },
  id(id: string) {
    return mod.ref(DB, `${REF_PATH}/${id}`);
  },
};

export function useSubscribe(callback: (record: NotesRecord) => void) {
  useEffect(() => mod.onValue(REFS.root(), (snapshot) => callback(snapshot.val())), []);
}

export async function create(params: CreateParams) {
  const data: Note = {
    id: createId(),
    folder_id: params.folder_id,
    date: createDate(),
    title: 'New Note',
    content: '',
  };

  return mod
    .update(mod.ref(DB, '/'), {
      [`/folders/${data.folder_id}/notes/${data.id}`]: true,
      [`/notes/${data.id}`]: data,
    })
    .then(() => ({ id: data.id }));
}

export async function update(params: UpdateParams, data: UpdateData) {
  if (data.folder_id) {
    const note = await mod.get(REFS.id(params.id)).then((s) => s.val());
    return mod.update(mod.ref(DB, '/'), {
      [`/folders/${note.folder_id}/notes/${note.id}`]: null,
      [`/folders/${data.folder_id}/notes/${note.id}`]: true,
      [`/notes/${note.id}/folder_id`]: data.folder_id, // FIXME?
    });
  }
  return mod.update(REFS.id(params.id), data);
}

export async function remove(params: RemoveParams) {
  const note = await mod.get(REFS.id(params.id)).then((s) => s.val());
  if (note) {
    return mod.update(mod.ref(DB, '/'), {
      [`/folders/${note.folder_id}/notes/${note.id}`]: null,
      [`/notes/${note.id}`]: null,
    });
  }
}
