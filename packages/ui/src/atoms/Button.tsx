import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '../lib';

const buttonVariants = tv({
  base: 'flex h-9 items-center justify-center whitespace-nowrap rounded px-4 py-2 text-small font-medium shadow transition-colors duration-base',
  variants: {
    color: {
      primary: 'bg-primary text-primary-100 hover:bg-primary-800 hover:text-primary-50',
      ghost: 'bg-grayscale-50 text-grayscale-800 hover:bg-grayscale-100 hover:text-grayscale-900',
    },
    disabled: {
      true: 'cursor-not-allowed bg-grayscale-300 text-grayscale-500 hover:bg-grayscale-300 hover:text-grayscale-500',
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
  iconStart,
  iconEnd,
  disabled,
  type,
  ...properties
}: ButtonProperties) {
  const cls = cn(buttonVariants({ color, disabled }), className);
  return (
    <button type={type} className={cls} disabled={disabled} {...properties}>
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}
