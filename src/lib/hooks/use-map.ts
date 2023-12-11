import { useState, useMemo } from 'react';

export default function useMap<T>() {
  const [state, forceUpdate] = useState({});
  const [map] = useState(() => new Map<string, T>());

  const contents = useMemo(() => Array.from(map.values()), [state]);

  return { map, contents, forceUpdate };
}
