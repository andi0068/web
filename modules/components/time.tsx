'use client';
import { useState, useEffect, memo } from 'react';

import useTimeout from '@/shared/hooks/use-timeout';
import useFormattedTime from '@/shared/hooks/use-formatted-time';

interface TimeProps {
  dateTime: string;
}

const Time = memo(function Time({ dateTime }: TimeProps) {
  const [state, dispatch] = useState(() => new Date(dateTime));

  const timeout = useTimeout();
  const time = useFormattedTime(state);

  useEffect(() => {
    const ms = 1000 - state.getMilliseconds();
    return timeout.set(() => dispatch((s) => new Date(+s + ms)), ms);
  }, [state]);

  return <time dateTime={state.toString()}>{time}</time>;
});

export default Time;
