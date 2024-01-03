'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import * as App from '@/components/app';

export default function Home() {
  return (
    <Provider>
      <App.Root>
        <App.Content />
      </App.Root>
    </Provider>
  );
}

function Provider({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const onLogin = useCallback(() => router.push('/login'), []);

  return <App.Provider onLogin={onLogin}>{children}</App.Provider>;
}
