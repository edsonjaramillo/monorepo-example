import { z } from 'zod';

import { folders } from 'common';

import { zBlob, zFile, zString } from '../core';

export const zFolderEnum = z.enum(folders);

export const zUploadImageFormClientSchema = z.object({
  folder: zFolderEnum,
  image: zBlob,
});

export type UploadImageForm = z.infer<typeof zUploadImageFormClientSchema>;

export const zUploadImageFormServerSchema = z.object({
  folder: zString,
  image: zFile,
});
