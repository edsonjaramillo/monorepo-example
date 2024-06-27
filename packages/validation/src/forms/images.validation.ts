import { z } from 'zod';

import { folders } from 'db';

export const zUploadImageFormSchema = z.object({
  folder: z.enum(folders),
  image: z.instanceof(File),
});

export type UploadImageForm = z.infer<typeof zUploadImageFormSchema>;
