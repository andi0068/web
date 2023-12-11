export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}
export interface ButtonProps<T = HTMLButtonElement> extends React.AriaAttributes, BaseProps {
  onClick?: React.MouseEventHandler<T>;
  active?: boolean;
}
export interface MetaProps extends BaseProps {
  date: string;
  content: string;
  pinned?: boolean;
}
