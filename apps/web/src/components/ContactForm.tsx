'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import type { FieldErrors } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '~/ui/atoms/Button';
import { Form } from '~/ui/atoms/Form';
import { Input, InputGroup, Textarea } from '~/ui/atoms/Input';
import { Label } from '~/ui/atoms/Label';
import { Text } from '~/ui/atoms/Text';

const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  phoneNumber: z.string().min(10).max(15),
  message: z.string().min(10).max(500),
});

const toastId = 'contact-form-toast';
type FormSchema = z.infer<typeof contactFormSchema>;

async function onSubmit(_: FormSchema) {
  toast.info('Sending message...', { id: toastId, duration: Infinity });
  await new Promise((resolve) => setTimeout(resolve, 3000));
  toast.success('Message sent!', { id: toastId });
}

function onInvalid(errors: FieldErrors<FormSchema>) {
  toast.error('Please fix the errors in the form.', { id: toastId });
}

export function ContactForm() {
  const methods = useForm<FormSchema>({ resolver: zodResolver(contactFormSchema) });
  const { isSubmitting } = methods.formState;
  return (
    <div className="py-8">
      <div className="mb-8 space-y-1">
        <Text as="h2" size="4xl" className="font-bold">
          Contact Us
        </Text>
        <Text as="p" color="neutral">
          We&apos;ll get back to you as soon as we can.
        </Text>
      </div>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit, onInvalid)}>
          <InputGroup>
            <Label field="name">Name</Label>
            <Input field="name" type="text" autoComplete="name" required />
          </InputGroup>
          <InputGroup>
            <Label field="phoneNumber">Phone Number</Label>
            <Input field="phoneNumber" type="tel" autoComplete="tel" required />
          </InputGroup>
          <InputGroup>
            <Label field="message">Message</Label>
            <Textarea field="message" required />
          </InputGroup>
          <Button type="submit" className="ml-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </Form>
      </FormProvider>
    </div>
  );
}
