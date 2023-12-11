import { useEffect } from 'react';
import * as mod from 'firebase/auth';

import { APP } from './firebase';

type SignInData = {
  email: string;
  password: string;
};

const AUTH = mod.getAuth(APP);

export function useSubscribe(callback: (user: mod.User | null) => void) {
  useEffect(() => mod.onAuthStateChanged(AUTH, callback), []);
}

export async function signIn(data: SignInData) {
  return mod.signInWithEmailAndPassword(AUTH, data.email, data.password);
}

export async function signOut() {
  return mod.signOut(AUTH);
}
