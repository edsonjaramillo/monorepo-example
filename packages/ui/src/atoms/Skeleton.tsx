import { cn } from '../lib/cn';

type SkeletonProps = React.ComponentProps<'div'>;

export function Skeleton({ className, children, ...props }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded bg-grayscale-200', className)} {...props}>
      {children}
    </div>
  );
}
