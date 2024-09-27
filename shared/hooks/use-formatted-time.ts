import { useMemo } from 'react';

import * as number from '@/shared/utils/number';

export default function useFormattedTime(date: Date) {
  return useMemo(
    () => `${number.format(date.getHours())}:${number.format(date.getMinutes())}`,
    [date],
  );
}
