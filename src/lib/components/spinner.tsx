import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import styles from './spinner.module.css';

export type SpinnerColorScheme = 'accent' | 'gray';

export interface SpinnerProps {
  className?: string;
  /**
   * @default 'accent'
   */
  colorScheme?: SpinnerColorScheme;
}

const getClassName = cva(['shrink-0', 'rounded-full', 'w-6 h-6 border-[3px]', styles.spinner], {
  variants: {
    colorScheme: {
      accent: 'border-accent/20 border-r-accent',
      gray: 'border-foreground-primary/20 border-r-foreground-secondary',
    },
  },
});

export default function Spinner({ className, colorScheme = 'accent' }: SpinnerProps) {
  return <span className={cn(getClassName({ colorScheme, className }))} />;
}
