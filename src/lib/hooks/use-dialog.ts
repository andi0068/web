import { useState, useMemo } from 'react';

type Content = React.ReactElement;

type State = {
  readonly isOpen: boolean;
  readonly title?: string;
  readonly content?: Content;
};

interface OpenProps {
  title: string;
  content: Content;
}

const factory = {
  closed: {
    isOpen: false,
    title: undefined,
    content: undefined,
  },
  open: ({ title, content }: OpenProps) => ({
    isOpen: true,
    title,
    content,
  }),
};

export default function useDialog() {
  const [{ isOpen, title, content }, dispatch] = useState<State>(factory.closed);

  const open = (props: OpenProps) => dispatch(factory.open(props));
  const close = () => dispatch(factory.closed);

  return useMemo(() => ({ isOpen, title, content, open, close }), [isOpen]);
}

export type UseDialogReturn = ReturnType<typeof useDialog>;
