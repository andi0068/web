export type Menu =
  | {
      key: string;
      label: string;
      disabled?: boolean;
      onClick?(): void | Promise<void>;
    }
  | 'separator';

export type AppClientConfig = {
  sidebar_collapsed?: boolean;
};

export type Folder = {
  id: string;
  date: string;
  name: string;
  notes?: Record<string, true>;
};

export type Note = {
  id: string;
  folder_id: string;
  date: string;
  title: string;
  content: string;
  pinned?: boolean;
};

export type FoldersRecord = Record<string, Folder>;
export type NotesRecord = Record<string, Note>;
