export type Menu =
  | {
      key: string;
      label: string;
      disabled?: boolean;
      onClick?(): void | Promise<void>;
    }
  | 'separator';

export type Note = {
  id: string;
  date: string;
  title: string;
  content: string;
  pinned?: boolean;
};

export type NotesRecord = Record<string, Note>;
