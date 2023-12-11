export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}
export interface BasePropsWithAs extends BaseProps {
  as?: React.ElementType;
}
