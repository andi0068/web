import forwardRef from '@/lib/forward-ref';
import { cn } from '@/lib/utils';

export interface BaseIconProps {
  children?: React.ReactNode;
  className?: string;
}
export interface IconProps extends BaseIconProps, React.ComponentPropsWithRef<'svg'> {
  as?: React.ElementType;
}

const Icon = forwardRef<BaseIconProps, 'svg'>(({ as: As = 'svg', className, ...rest }, ref) => (
  <As ref={ref} className={cn('shrink-0 stroke-2 text-current w-em h-em', className)} {...rest} />
));

export default Icon;
