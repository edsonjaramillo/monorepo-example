import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '../lib';

export const buttonVariants = tv({
  base: 'flex h-9 items-center justify-center whitespace-nowrap rounded px-4 py-2 text-small font-medium shadow transition-colors duration-base',
  variants: {
    color: {
      primary: 'bg-primary text-primary-100 hover:bg-primary-800 hover:text-primary-50',
      success: 'bg-success text-success-accent hover:bg-success-darken',
      error: 'bg-error text-error-accent hover:bg-error-darken',
      info: 'bg-info text-info-accent hover:bg-info-darken',
      warning: 'bg-warning text-warning-accent hover:bg-warning-darken',
      ghost: 'bg-grayscale-50 text-grayscale-800 hover:bg-grayscale-100 hover:text-grayscale-900',
    },
    disabled: {
      true: 'cursor-not-allowed bg-grayscale-300 text-grayscale-500 hover:bg-grayscale-300 hover:text-grayscale-500',
    },
    width: {
      full: 'w-full',
    },
  },
  defaultVariants: { color: 'primary' },
});

type ButtonCore = React.ComponentProps<'button'>;
type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProperties = ButtonCore &
  ButtonVariants & {
    type: ButtonCore['type'];
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
  };

export function Button({
  children,
  className,
  color,
  disabled,
  iconEnd,
  iconStart,
  type,
  width,
  ...properties
}: ButtonProperties) {
  const cls = cn(buttonVariants({ color, disabled, width }), className);
  return (
    <button type={type} className={cls} disabled={disabled} {...properties}>
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}
