import { useEffect } from 'react';
import * as mod from 'firebase/database';

import { createId, createDate } from '@/utils/services-utils';
import type { NotesRecord, Note } from '@/types';

import { APP } from './firebase';

export type UpdateParams = {
  id: string;
};
export type UpdateData = {
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

export async function create() {
  const data: Note = {
    id: createId(),
    date: createDate(),
    title: 'New Note',
    content: '',
  };

  return mod.set(REFS.id(data.id), data).then(() => ({ id: data.id }));
}

export async function update(params: UpdateParams, data: UpdateData) {
  return mod.update(REFS.id(params.id), data);
}

export async function remove(params: RemoveParams) {
  return mod.remove(REFS.id(params.id));
}
