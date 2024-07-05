'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { type FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import type { SessionWithUser } from 'db';

import { zSignInSchema } from 'validation';

import { Button, DEFAULT_DURATION, Form, Input, InputGroup, Label, Text } from 'ui';

import { useSession } from '../context/web.context';
import { clientFetcher } from '../utils/web.clients';

const toastId = 'signin-form-toast';
type FormSchema = z.infer<typeof zSignInSchema>;

function onInvalid(_: FieldErrors<FormSchema>) {
  toast.error('Please fix the errors in the form.', { id: toastId });
}

export function SignInForm() {
  const { signin, session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);

  const methods = useForm<FormSchema>({ resolver: zodResolver(zSignInSchema) });
  const { formState, handleSubmit } = methods;
  const { isSubmitting } = formState;

  return (
    <div className="py-8">
      <div className="mb-8 space-y-1">
        <Text as="h2" size="4xl" className="font-bold">
          Sign In
        </Text>
      </div>
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmit(async (formData: FormSchema) => {
            toast.info('Signing in...', { id: toastId });

            const response = await clientFetcher.post<SessionWithUser>('/auth/signin', formData);
            if (response.status === 'success') {
              signin(response.data);
              toast.success('Signed in', { id: toastId });
              return;
            }

            toast.error(response.message, { id: toastId, duration: DEFAULT_DURATION });
          }, onInvalid)}>
          <InputGroup>
            <Label field="email">Email</Label>
            <Input field="email" type="email" autoComplete="email" required />
          </InputGroup>
          <InputGroup>
            <Label field="password">Password</Label>
            <Input field="password" type="password" autoComplete="new-password" required />
          </InputGroup>
          <Button type="submit" className="ml-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </Form>
      </FormProvider>
    </div>
  );
}
