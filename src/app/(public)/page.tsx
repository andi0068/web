'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import * as App from '@/components/app';

export default function Home() {
  const router = useRouter();
  const onLogin = useCallback(() => router.push('/login'), []);

  return (
    <App.Provider onLogin={onLogin}>
      <App.Root>
        <App.Content />
      </App.Root>
    </App.Provider>
  );
}
