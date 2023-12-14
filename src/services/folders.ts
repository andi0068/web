import { useEffect } from 'react';
import * as mod from 'firebase/database';

import { createId, createDate } from '@/utils/services-utils';
import type { FoldersRecord, Folder } from '@/types';

import { APP } from './firebase';

export type UpdateParams = {
  id: string;
};
export type UpdateData = {
  name?: string;
};

export type RemoveParams = {
  id: string;
};

const DB = mod.getDatabase(APP);
const REF_PATH = '/folders';
const REFS = {
  root() {
    return mod.ref(DB, REF_PATH);
  },
  id(id: string) {
    return mod.ref(DB, `${REF_PATH}/${id}`);
  },
};

export function useSubscribe(callback: (record: FoldersRecord) => void) {
  useEffect(() => mod.onValue(REFS.root(), (snapshot) => callback(snapshot.val())), []);
}

export async function create() {
  const data: Folder = {
    id: createId(),
    date: createDate(),
    name: 'New Folder',
  };

  return mod.set(REFS.id(data.id), data).then(() => ({ id: data.id }));
}

export async function update(params: UpdateParams, data: UpdateData) {
  return mod.update(REFS.id(params.id), data);
}

export async function remove(params: RemoveParams) {
  const folder = await mod.get(REFS.id(params.id)).then((s) => s.val());
  if (folder) {
    return mod.update(
      mod.ref(DB, '/'),
      Object.keys(folder.notes ?? {}).reduce(
        (res, note_id) => ({ ...res, [`/notes/${note_id}`]: null }),
        { [`/folders/${params.id}`]: null },
      ),
    );
  }
}
