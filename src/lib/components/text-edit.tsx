import { useEffect, useRef, forwardRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { cva } from 'class-variance-authority';

import useAutoResize from '@/lib/hooks/use-auto-resize';
import useInput from '@/lib/hooks/use-input';
import useDebounce from '@/lib/hooks/use-debounce';
import { cn } from '@/lib/utils';

export interface TextEditOptions {
  /**
   * @default 'primary'
   */
  color?: 'primary' | 'secondary';
}

export interface TextEditProps extends TextEditOptions {
  className?: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?(value: string): void;
}

const getClassName = cva('resize-none w-full outline-none bg-transparent', {
  variants: {
    color: {
      primary: 'text-foreground-primary placeholder:text-foreground-secondary',
      secondary: 'text-foreground-secondary placeholder:text-foreground-tertiary',
    },
  },
});

const TextEdit = forwardRef<HTMLTextAreaElement, TextEditProps>(
  (
    {
      className,
      value: defaultValue = '',
      placeholder,
      readOnly,
      onChange: onChangeProp,
      color = 'primary',
    },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const [value, onChange] = useInput(defaultValue);

    useAutoResize({ ref, value });

    useEffect(() => onChange(defaultValue), [defaultValue]);
    useDebounce(() => value !== defaultValue && onChangeProp?.(value), [value]);

    return (
      <textarea
        ref={mergeRefs([forwardedRef, ref])}
        rows={1}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={false}
        onChange={onChange}
        className={cn(getClassName({ color, className }))}
      />
    );
  },
);

export default TextEdit;
