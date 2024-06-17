'use client';

import { useFormContext } from 'react-hook-form';
import type { FieldError, Merge, RegisterOptions } from 'react-hook-form';
import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '../lib/cn';
import { Text } from './Text';

export const coreVariants = tv({
  base: 'w-full rounded border border-grayscale-300 bg-transparent px-3 py-2 text-small text-grayscale-neutral shadow',
  variants: {
    disabled: {
      true: 'cursor-not-allowed bg-grayscale-200 text-grayscale-400',
    },
  },
});

export const inputVariants = tv({ extend: coreVariants, base: 'h-9' });

type InputProps = React.ComponentProps<'input'> & {
  field: string;
  type: React.ComponentProps<'input'>['type'];
  helpMessage?: string;
  registerOptions?: RegisterOptions;
};

export function Input({
  field,
  helpMessage,
  className,
  disabled,
  registerOptions,
  required,
  ...props
}: InputProps) {
  const { register, formState } = useFormContext();
  const error = formState.errors[field];
  const cls = cn(inputVariants({ disabled }), className);
  return (
    <>
      <input
        id={`${field}-input`}
        className={cls}
        aria-describedby={helpMessage && `${field}-help`}
        aria-errormessage={error && `${field}-error`}
        aria-invalid={!!error}
        aria-labelledby={`${field}-label`}
        disabled={disabled}
        {...register(field, { required, ...registerOptions })}
        {...props}
      />
      {helpMessage && <InputHelp field={field}>{helpMessage}</InputHelp>}
      {error && <InputError field={field} error={error} />}
    </>
  );
}

export const textareaVariants = tv({
  extend: coreVariants,
  base: 'resize-y',
});

type TextareaProps = React.ComponentProps<'textarea'> & {
  field: string;
  helpMessage?: string;
  registerOptions?: RegisterOptions;
};

export function Textarea({
  field,
  helpMessage,
  className,
  disabled,
  registerOptions,
  required,
  ...props
}: TextareaProps) {
  const { register, formState } = useFormContext();
  const error = formState.errors[field];
  const cls = cn(textareaVariants({ disabled }), className);
  return (
    <>
      <textarea
        id={`${field}-input`}
        className={cls}
        aria-describedby={helpMessage && `${field}-help`}
        aria-errormessage={error && `${field}-error`}
        aria-invalid={!!error}
        aria-labelledby={`${field}-label`}
        disabled={disabled}
        rows={10}
        {...register(field, { required, ...registerOptions })}
        {...props}
      />
      {helpMessage && <InputHelp field={field}>{helpMessage}</InputHelp>}
      {error && <InputError field={field} error={error} />}
    </>
  );
}

// Extra components

// InputGroup
type InputGroupProps = React.ComponentProps<'div'>;
export function InputGroup({ children, className, ...props }: InputGroupProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {children}
    </div>
  );
}

export const formColumnsVariants = tv({
  base: 'grid gap-6',
  variants: { columns: { '1': 'grid-cols-1', '2': 'grid-cols-2', '3': 'grid-cols-3' } },
  defaultVariants: { columns: '1' },
});

type InputColumnsCore = React.ComponentProps<'div'>;
type InputColumnsVariants = VariantProps<typeof formColumnsVariants>;
type InputColumnsProps = InputColumnsCore & InputColumnsVariants;
export function InputColumns({ children, className, columns, ...props }: InputColumnsProps) {
  return (
    <div className={cn(formColumnsVariants({ columns }), className)} {...props}>
      {children}
    </div>
  );
}

// Input Help
type InputHelp = React.ComponentProps<'p'> & { field: string };
function InputHelp({ children, field }: InputHelp) {
  return (
    <Text as="p" size="small" color="neutral" id={`${field}-help`}>
      {children}
    </Text>
  );
}

type CustomFieldError = Merge<FieldError, { message: string }>;
// Input Error
type InputError = React.ComponentProps<'p'> & { field: string; error: CustomFieldError };
function InputError({ className, error, field }: InputError) {
  return (
    <Text
      as="p"
      size="small"
      id={`${field}-error`}
      className={cn('font-medium text-error', className)}
      aria-live="assertive">
      {error.message}
    </Text>
  );
}
