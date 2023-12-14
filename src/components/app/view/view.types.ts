export interface ViewOptions {
  /**
   * @default 'default'
   */
  scrollbar?: 'default' | 'minimize';
  /**
   * @default 'full'
   */
  size?: 'side' | 'list' | 'editor' | 'full';
  /**
   * @default 'none'
   */
  border?: 'right' | 'none';
}

export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}
export interface ProviderProps extends ViewOptions {
  children?: React.ReactNode;
}
export interface ViewProps extends ProviderProps, BaseProps {
  as?: React.ElementType;
}
