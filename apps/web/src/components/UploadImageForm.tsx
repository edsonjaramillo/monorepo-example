'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { zUploadImageFormSchema } from 'validation';

import { Button, Form, Input, InputGroup, Label, Text } from 'ui';

import { clientFetcher } from '../utils/clients';

const toastId = 'upload-form-toast';
type FormSchema = z.infer<typeof zUploadImageFormSchema>;

async function onSubmit(data: FormSchema) {
  toast.info('Sending message...', { id: toastId });

  const formData = new FormData();
  formData.append('folder', data.folder);
  formData.append('image', data.image[0]);

  //   form data
  const response = await clientFetcher.form('/images/upload', formData);

  if (response.status === 'success') {
    toast.success('Image uploaded!', { id: toastId });
    return;
  }

  toast.error(response.message, { id: toastId });
}

function onInvalid(errors: FieldErrors<FormSchema>) {
  toast.error('Please fix the errors in the form.', { id: toastId });
}

export function UploadImageForm() {
  const methods = useForm<FormSchema>({ resolver: zodResolver(zUploadImageFormSchema) });
  const { formState, handleSubmit, watch, register } = methods;
  const { isSubmitting } = formState;
  return (
    <div className="py-8">
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
      <div className="mb-8 space-y-1">
        <Text as="h2" size="4xl" className="font-bold">
          Upload Image
        </Text>
      </div>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <InputGroup>
            <Label field="folder">Folder</Label>
            <Input field="folder" type="folder" required />
          </InputGroup>
          <InputGroup>
            <Label field="image">Image</Label>
            <input type="file" required {...register('image', { required: 'Image is required' })} />
          </InputGroup>
          <Button type="submit" className="ml-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Uploading...' : 'Upload Image'}
          </Button>
        </Form>
      </FormProvider>
    </div>
  );
}
