export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}
export interface ContentProps extends BaseProps {
  as?: React.ElementType;
}
