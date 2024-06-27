import { z } from 'zod';

import { zString } from '../core';

export const zUploadImageFormSchema = z.object({
  folder: zString,
  image: z.instanceof(File),
});

export type UploadImageForm = z.infer<typeof zUploadImageFormSchema>;
