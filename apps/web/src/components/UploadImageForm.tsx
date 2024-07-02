'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { zUploadImageFormClientSchema } from 'validation';

import { StringUtils } from 'common';

import { Button, File, Form, InputGroup, Label, Radio, Text } from 'ui';

import { clientFetcher } from '../utils/clients';

const toastId = 'upload-form-toast';
type FormSchema = z.infer<typeof zUploadImageFormClientSchema>;

async function onSubmit(data: FormSchema) {
  toast.info('Uploading...', { id: toastId });

  const formData = new FormData();
  formData.append('folder', data.folder);
  formData.append('image', data.image[0]);

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
  const methods = useForm<FormSchema>({ resolver: zodResolver(zUploadImageFormClientSchema) });
  const { formState, handleSubmit } = methods;
  const { isSubmitting } = formState;
  return (
    <div className="py-8">
      <div className="mb-8 space-y-1">
        <Text as="h2" size="4xl" className="font-bold">
          Upload Image
        </Text>
      </div>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <InputGroup>
            <Text as="label">Folder</Text>
            <div className="flex flex-col gap-3">
              <Radio
                field="folder"
                value="misc"
                label={StringUtils.capitalize('misc')}
                defaultChecked
              />
              <Radio field="folder" value="users" label={StringUtils.capitalize('users')} />
              <Radio field="folder" value="pets" label={StringUtils.capitalize('pets')} />
            </div>
          </InputGroup>
          <InputGroup>
            <Label field="image">Image</Label>
            <File
              field="image"
              accept="image/*,.heic"
              helpMessage="Supported formats: JPG, PNG, WEBP and HEIC. Maximum file size: 10MB."
              required
            />
          </InputGroup>
          <Button type="submit" className="ml-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Uploading...' : 'Upload Image'}
          </Button>
        </Form>
      </FormProvider>
    </div>
  );
}
