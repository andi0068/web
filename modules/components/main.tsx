import { BaseProps } from '@/shared/types';

export function Main({ children }: BaseProps) {
  return <main className="grow space-y-6">{children}</main>;
}
