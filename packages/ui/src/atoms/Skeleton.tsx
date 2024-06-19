import { cn } from '../lib/cn';

type SkeletonProperties = React.ComponentProps<'div'>;

export function Skeleton({ className, children, ...properties }: SkeletonProperties) {
  return (
    <div className={cn('animate-pulse rounded bg-grayscale-200', className)} {...properties}>
      {children}
    </div>
  );
}
