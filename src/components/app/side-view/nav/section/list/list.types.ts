export interface RowOptions {
  /**
   * @default 'gray'
   */
  activeBg?: 'accent' | 'gray';
}

export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}
export interface ListProps extends BaseProps {
  isEmpty?: boolean;
  emptyText?: string;
}
export interface RowProps<T = HTMLButtonElement> extends RowOptions, BaseProps {
  onClick?: React.MouseEventHandler<T>;
  icon?: React.ElementType;
  active?: boolean;
  count?: number;
}
