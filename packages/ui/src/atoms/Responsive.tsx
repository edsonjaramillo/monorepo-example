import { cn } from '../lib/cn';

type ResponsiveProps = React.ComponentProps<'div'>;
export function Responsive({ children, className, ...props }: ResponsiveProps) {
  return (
    <div className={cn('mx-auto w-responsive', className)} {...props}>
      {children}
    </div>
  );
}
