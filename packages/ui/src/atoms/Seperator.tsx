import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '../lib/cn';

export const seperatorVariants = cva('shrink-0 bg-grayscale-400', {
  variants: {
    orientation: { horizontal: 'h-[1px] w-full', vertical: 'h-full w-[1px]' },
    marginless: { true: 'my-0', false: 'my-4' },
  },
  defaultVariants: { orientation: 'horizontal', marginless: false },
});

type SeperatorProps = React.ComponentProps<'div'> &
  VariantProps<typeof seperatorVariants> & {
    decorative?: boolean;
  };

export function Seperator({
  className,
  decorative = true,
  marginless,
  orientation,
  ...props
}: SeperatorProps) {
  return (
    <div
      aria-hidden={decorative}
      className={cn(seperatorVariants({ marginless, orientation }), className)}
      {...props}
    />
  );
}
