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
