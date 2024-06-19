import { cn } from '../lib/cn';

type ResponsiveProperties = React.ComponentProps<'div'>;
export function Responsive({ children, className, ...properties }: ResponsiveProperties) {
  return (
    <div className={cn('mx-auto w-responsive', className)} {...properties}>
      {children}
    </div>
  );
}
