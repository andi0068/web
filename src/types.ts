type BaseMenu = {
  key: string;
  label: string;
  disabled?: boolean;
  onClick?(): void | Promise<void>;
};

export type Menu = (BaseMenu & { sub?: BaseMenu[] }) | 'separator';
export type SubMenu = BaseMenu;

export type StateClientConfig = {};
export type AppClientConfig = {
  sidebar_collapsed?: boolean;
  sidebar_recents_collapsed?: boolean;
  sidebar_folders_collapsed?: boolean;
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

export type AuthState = {
  readonly ready: boolean;
  readonly user: boolean;
};

export type ResourceState<T extends { id: string }> = {
  readonly ready: boolean;
  readonly raw: Record<string, T>;
  readonly data: T[];
  readonly selected?: T | null;
};

export type State = {
  readonly auth: AuthState;
  readonly folders: ResourceState<Folder>;
  readonly notes: ResourceState<Note>;
};
