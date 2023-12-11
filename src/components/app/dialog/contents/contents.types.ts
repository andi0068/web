export type ButtonMouseEventHandler<T = HTMLButtonElement> = (
  event: React.MouseEvent<T>,
) => Promise<void>;
export type Entry = [string, string];

export interface AlertProps {
  button: {
    label: string;
    onClick?: ButtonMouseEventHandler;
  };
}
export interface AboutProps {
  entries: Entry[];
}
