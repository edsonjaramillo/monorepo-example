import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '../lib/cn';

export const seperatorVariants = tv({
  base: 'shrink-0 bg-grayscale-400',
  variants: {
    orientation: { horizontal: 'h-[1px] w-full', vertical: 'h-full w-[1px]' },
    marginless: { true: 'my-0', false: 'my-4' },
  },
  defaultVariants: { orientation: 'horizontal', marginless: false },
});

type SeperatorProperties = React.ComponentProps<'div'> &
  VariantProps<typeof seperatorVariants> & {
    decorative?: boolean;
  };

export function Seperator({
  className,
  decorative = true,
  marginless,
  orientation,
  ...properties
}: SeperatorProperties) {
  return (
    <div
      aria-hidden={decorative}
      className={cn(seperatorVariants({ marginless, orientation }), className)}
      {...properties}
    />
  );
}
