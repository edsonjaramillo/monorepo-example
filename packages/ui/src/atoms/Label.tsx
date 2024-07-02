'use client';

import { useFormContext } from 'react-hook-form';

import { cn } from '../lib/cn';
import { textVariants } from './Text';

export const labelCls = cn(textVariants({ size: 'small' }), 'block font-medium');

type LabelProperties = React.ComponentProps<'label'> & { field: string };
export function Label({ className, children, field, ...properties }: LabelProperties) {
  const { formState } = useFormContext();
  return (
    <label
      id={`${field}-label`}
      htmlFor={`${field}-input`}
      className={cn(labelCls, formState.errors[field] && 'text-error', className)}
      {...properties}>
      {children}
    </label>
  );
}
