import { forwardRef } from 'react';
import { FiX } from 'react-icons/fi';

import { cn } from '@/lib/utils';

import Button from './button';
import Icon from './icon';

const CloseButton = forwardRef<HTMLButtonElement, React.ComponentPropsWithRef<'button'>>(
  ({ className, ...rest }, ref) => (
    <Button
      ref={ref}
      variant="none"
      size="none"
      className={cn('rounded-full text-foreground-secondary', 'w-8 h-8', className)}
      aria-label="Close"
      {...rest}
    >
      <Icon as={FiX} />
    </Button>
  ),
);

export default CloseButton;
