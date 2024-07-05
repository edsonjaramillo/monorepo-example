'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { zSignupSchema } from 'validation';

import { Button, Form, Input, InputGroup, Label, Text } from 'ui';

import { clientFetcher } from '../../utils/web.clients';

const toastId = 'signup-form-toast';
type FormSchema = z.infer<typeof zSignupSchema>;

function onInvalid(errors: FieldErrors<FormSchema>) {
  toast.error('Please fix the errors in the form.', { id: toastId });
}

export function SignupForm() {
  const methods = useForm<FormSchema>({ resolver: zodResolver(zSignupSchema) });
  const { formState, handleSubmit } = methods;
  const { isSubmitting } = formState;
  const router = useRouter();

  return (
    <div className="py-8">
      <div className="mb-8 space-y-1">
        <Text as="h2" size="4xl" className="font-bold">
          Sign Up
        </Text>
        <Text as="p" color="neutral">
          We&apos;ll get back to you as soon as we can.
        </Text>
      </div>
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmit(async (formData: FormSchema) => {
            toast.info('Signing up...', { id: toastId });
            const response = await clientFetcher.post('/auth/signup', formData);
            if (response.status === 'success') {
              router.push('/signin');
              toast.success('Signed up', { id: toastId });
              return;
            }

            toast.error(response.message, { id: toastId });
          }, onInvalid)}>
          <InputGroup>
            <Label field="name">Name</Label>
            <Input field="name" type="text" autoComplete="name" required />
          </InputGroup>
          <InputGroup>
            <Label field="email">Email</Label>
            <Input field="email" type="email" autoComplete="email" required />
          </InputGroup>
          <InputGroup>
            <Label field="password">Password</Label>
            <Input field="password" type="password" autoComplete="new-password" required />
          </InputGroup>
          <Button type="submit" className="ml-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </Button>
        </Form>
      </FormProvider>
    </div>
  );
}
