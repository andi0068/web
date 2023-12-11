import type { UseEditableProps } from '@/lib/hooks/use-editable';

export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}
export interface HeadingProps extends UseEditableProps {
  className?: string;
  as?: React.ElementType;
}
