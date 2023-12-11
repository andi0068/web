import { v4 as uuidv4 } from 'uuid';

export function env() {
  return {
    AUTHOR_USERNAME: process.env.NEXT_AUTHOR_USERNAME,
    AUTHOR_EMAIL: process.env.NEXT_AUTHOR_EMAIL,
    API_KEY: process.env.NEXT_API_KEY,
    AUTH_DOMAIN: process.env.NEXT_AUTH_DOMAIN,
    DATABASE_URL: process.env.NEXT_DATABASE_URL,
    PROJECT_ID: process.env.NEXT_PROJECT_ID,
    STORAGE_BUCKET: process.env.NEXT_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.NEXT_MESSAGING_SENDER_ID,
    APP_ID: process.env.NEXT_APP_ID,
  };
}

export function createId() {
  return uuidv4();
}

export function createDate() {
  return new Date().toISOString();
}

export function sortDesc<T extends { date?: string }>(items: T[]) {
  return items.sort((a, b) => {
    if (!(b.date && a.date)) return 0;
    return b.date.localeCompare(a.date, undefined, { numeric: true });
  });
}

export function sortByPinned<T extends { pinned?: boolean }>(items: T[]) {
  const pinned: T[] = [];
  const unpinned: T[] = [];

  items.forEach((item) => {
    (item.pinned ? pinned : unpinned).push(item);
  });

  return [...pinned, ...unpinned];
}
