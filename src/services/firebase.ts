import { initializeApp, getApps, getApp } from 'firebase/app';

import { firebaseConfig } from '@/config/firebase';

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const APP = getApp();
