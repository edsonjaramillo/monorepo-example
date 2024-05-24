import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from './lib/cn';

export const buttonVariants = cva(
  'flex h-9 items-center justify-center whitespace-nowrap rounded px-4 py-2 text-small font-medium shadow transition-colors duration-base',
  {
    variants: {
      color: {
        primary: 'bg-primary text-primary-100 hover:bg-primary-800 hover:text-primary-50',
        ghost: 'bg-grayscale-50 text-grayscale-800 hover:bg-grayscale-100 hover:text-grayscale-900',
      },
    },
    defaultVariants: { color: 'primary' },
  },
);

const disabledCn = cn(
  'cursor-not-allowed bg-grayscale-300 text-grayscale-500 hover:bg-grayscale-300 hover:text-grayscale-500',
);

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    iconStart?: React.ReactNode;
    type: React.ComponentProps<'button'>['type'];
    iconEnd?: React.ReactNode;
  };

export function Button({
  children,
  className,
  color,
  iconStart,
  iconEnd,
  disabled,
  ...props
}: ButtonProps) {
  const cls = cn(buttonVariants({ color }), className, disabled && disabledCn);
  return (
    <button className={cls} disabled={disabled} {...props}>
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}
