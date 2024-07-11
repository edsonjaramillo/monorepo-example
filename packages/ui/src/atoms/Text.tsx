import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '../lib/cn';

export type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';

export const textVariants = tv({
  variants: {
    size: {
      cta: 'text-cta',
      subheader: 'text-subheader',
      '5xl': 'text-5xl',
      '4xl': 'text-4xl',
      '3xl': 'text-3xl',
      '2xl': 'text-2xl',
      xl: 'text-xl',
      lg: 'text-lg',
      base: 'text-base',
      small: 'text-small',
    },
    color: {
      standard: 'border border-primary-600 text-grayscale-standard',
      neutral: 'text-grayscale-neutral',
      inverse: 'text-grayscale-inverse',
      primary: 'text-primary',
      'primary-base': 'text-primary-600',
    },
    underline: { true: 'underline underline-offset-4' },
    defaultVariants: { size: 'base', color: 'standard' },
  },
});

type TextCore = React.ComponentProps<'div'>;
type TextVariants = VariantProps<typeof textVariants>;
export type TextProperties = TextCore & TextVariants & { as: As };

export const labelCls = cn(textVariants({ size: 'small' }), 'block font-medium');

export function Text({
  as,
  children,
  className,
  underline,
  size,
  color,
  ...properties
}: TextProperties) {
  const classes = cn(textVariants({ color, underline, size }), className);
  switch (as) {
    case 'h1': {
      return (
        <h1 className={classes} {...properties}>
          {children}
        </h1>
      );
    }

    case 'h2': {
      return (
        <h2 className={classes} {...properties}>
          {children}
        </h2>
      );
    }

    case 'h3': {
      return (
        <h3 className={classes} {...properties}>
          {children}
        </h3>
      );
    }

    case 'h4': {
      return (
        <h4 className={classes} {...properties}>
          {children}
        </h4>
      );
    }

    case 'h5': {
      return (
        <h5 className={classes} {...properties}>
          {children}
        </h5>
      );
    }

    case 'h6': {
      return (
        <h6 className={classes} {...properties}>
          {children}
        </h6>
      );
    }

    case 'p': {
      return (
        <p className={classes} {...properties}>
          {children}
        </p>
      );
    }

    case 'span': {
      return (
        <span className={classes} {...properties}>
          {children}
        </span>
      );
    }

    case 'label': {
      return <label className={labelCls}>{children}</label>;
    }
  }
}
