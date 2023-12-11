export interface HeadingOptions {
  /**
   * @default 'default'
   */
  size?: 'default' | 'none';
}

export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}
export interface HeaderProps extends BaseProps {
  as?: React.ElementType;
}
export interface HeadingProps extends HeadingOptions, BaseProps {
  as?: React.ElementType;
}
