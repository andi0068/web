import type * as Form from '@/lib/components/form';

export type ButtonMouseEventHandler<T = HTMLButtonElement> = (
  event: React.MouseEvent<T>,
) => Promise<void>;

export interface BaseProps {
  children?: React.ReactNode;
}
export interface FormProps extends Form.FormProps, BaseProps {
  button: { label: string };
}
export interface AlertProps {
  button: {
    label: string;
    onClick?: ButtonMouseEventHandler;
  };
}
