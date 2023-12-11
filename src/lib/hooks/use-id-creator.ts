import { useRef } from 'react';

export default function useIdCreator() {
  const ref = useRef(0);

  function create() {
    ref.current += 1;
    return String(ref.current);
  }

  return create;
}
