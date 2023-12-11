export interface ActionsOptions {
  /**
   * @default 'xl'
   */
  size?: 'lg' | 'xl';
}

export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}
export interface ProviderProps extends ActionsOptions {
  children?: React.ReactNode;
}
export interface ActionsProps extends BaseProps {
  role?: React.AriaRole;
}
export interface ActionProps<T = HTMLButtonElement> extends React.AriaAttributes, BaseProps {
  label: string;
  icon: React.ElementType;
  role?: React.AriaRole;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<T>;
}
