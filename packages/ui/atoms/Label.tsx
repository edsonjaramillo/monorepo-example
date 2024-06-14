import { useFormContext } from 'react-hook-form';

import { cn } from '../lib/cn';
import { textVariants } from './Text';

const textClass = cn(textVariants({ size: 'small' }), 'block font-medium');

type LabelProps = React.ComponentProps<'label'> & { field: string };
export function Label({ className, children, field, ...props }: LabelProps) {
  const { formState } = useFormContext();
  return (
    <label
      id={`${field}-label`}
      htmlFor={`${field}-input`}
      className={cn(textClass, formState.errors[field] && 'text-error', className)}
      {...props}>
      {children}
    </label>
  );
}
