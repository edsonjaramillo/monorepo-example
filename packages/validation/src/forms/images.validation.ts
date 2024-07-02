import { z } from 'zod';

import { zClientFile, zFile, zString } from '../core';

export const zUploadImageFormClientSchema = z.object({
  folder: zString,
  image: zClientFile,
});

export type UploadImageForm = z.infer<typeof zUploadImageFormClientSchema>;

export const zUploadImageFormServerSchema = z.object({
  folder: zString,
  image: zFile,
});
