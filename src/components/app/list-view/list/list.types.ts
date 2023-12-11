export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}
export interface ListProps extends BaseProps {
  as?: React.ElementType;
}
export interface RowProps extends BaseProps {
  as?: React.ElementType;
  active?: boolean;
}
