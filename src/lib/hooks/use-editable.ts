import { useCallback } from 'react';

export interface UseEditableProps {
  children: string;
  required?: boolean;
  readOnly?: boolean;
  onChange?(value: string): void;
  onBlur?: React.FocusEventHandler;
}

export default function useEditable({
  children,
  required,
  readOnly,
  onChange,
  onBlur: onBlurProp,
}: UseEditableProps) {
  const onBlur = useCallback(
    (ev: React.FocusEvent) => {
      onBlurProp?.(ev);
      const el = ev.currentTarget;
      const { textContent } = el;

      if (textContent === null || textContent === children) return;
      if (required && !textContent.length) {
        el.textContent = children;
        return;
      }

      onChange?.(textContent);
    },
    [children, required, onChange, onBlurProp],
  );

  return readOnly
    ? ({
        children,
        onBlur: onBlurProp,
      } as const)
    : ({
        children,
        contentEditable: true,
        suppressContentEditableWarning: true,
        spellCheck: false,
        onBlur,
      } as const);
}
