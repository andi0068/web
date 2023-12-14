import { useEffect } from 'react';
import * as mod from 'firebase/database';

import type { FoldersRecord } from '@/types';

import { APP } from './firebase';

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
