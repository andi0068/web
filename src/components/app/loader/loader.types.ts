export interface LoaderOptions {
  /**
   * @default false
   */
  overlay?: boolean;
}

export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}
export type LoaderProps = LoaderOptions & BaseProps;
