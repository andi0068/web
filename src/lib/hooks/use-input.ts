import { useState, useCallback } from 'react';

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function useInput(initial = '') {
  const [value, setValue] = useState(initial);

  const handleChange = useCallback(
    (arg: string | ChangeEvent) => setValue(typeof arg === 'string' ? arg : arg.target.value),
    [],
  );

  return [value, handleChange] as const;
}
