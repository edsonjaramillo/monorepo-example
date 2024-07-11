'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type z } from 'zod';

import { zUploadImageFormClientSchema } from 'validation';

import { StringUtils, folders } from 'common';

import { Button, File, Form, InputGroup, Label, Radio, Text } from 'ui';

import { clientFetcher } from '../../utils/web.clients';

const toastId = 'upload-form-toast';
type FormSchema = z.infer<typeof zUploadImageFormClientSchema>;

function onInvalid(errors: FieldErrors<FormSchema>) {
  toast.error('Please fix the errors in the form.', { id: toastId });
}

export function UploadImageForm() {
  const methods = useForm<FormSchema>({ resolver: zodResolver(zUploadImageFormClientSchema) });
  const { formState, handleSubmit, resetField } = methods;
  const { isSubmitting } = formState;
  return (
    <div className="py-8">
      <div className="mb-8 space-y-1">
        <Text as="h2" size="4xl" className="font-bold">
          Upload Image
        </Text>
      </div>
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmit(async (data: FormSchema) => {
            toast.info('Uploading...', { id: toastId });

            const formData = new FormData();
            formData.append('folder', data.folder);
            // @ts-expect-error - image is a Blob but zod validation does not support it
            formData.append('image', data.image[0]);

            const response = await clientFetcher.form('/employee/images/upload', formData);

            if (response.status === 'success') {
              toast.success('Image uploaded!', { id: toastId });
              resetField('image');
              return;
            }

            toast.error(response.message, { id: toastId });
          }, onInvalid)}>
          <InputGroup>
            <Text as="label">Folder</Text>
            <div className="flex flex-col gap-3">
              {folders.map((folder, index) => {
                const isFirst = index === 0;
                return (
                  <Radio key={folder} field="folder" value={folder} defaultChecked={isFirst}>
                    {StringUtils.capitalize(folder)}
                  </Radio>
                );
              })}
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
