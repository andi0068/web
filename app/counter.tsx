'use client';
import { useState, useCallback } from 'react';

import Button from '@/shared/components/ui/button';

interface CounterProps {
  className?: string;
  defaultValue?: number;
}

export default function Counter({ className, defaultValue = 0 }: CounterProps) {
  const [state, dispatch] = useState(defaultValue);

  const onClick = useCallback(() => dispatch((s) => s + 1), []);

  return (
    <Button type="button" onClick={onClick} className={className}>
      {state}
    </Button>
  );
}
