'use client';
import * as Dialog from '@/components/app/dialog';
import * as Toast from '@/components/app/toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Provider>
      <Toast.Provider>{children}</Toast.Provider>
    </Dialog.Provider>
  );
}
