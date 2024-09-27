import { cn } from '@/shared/utils/tw';
import type { BaseProps, WithClassProp } from '@/shared/types';

export default function Container({ children, className }: WithClassProp<BaseProps>) {
  return (
    <div className={cn('mx-auto px-[1.125rem] max-w-[428px] lg:px-6', className)}>{children}</div>
  );
}
