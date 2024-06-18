import z from 'zod';

export const zUploadImageFormSchema = z.object({
  folder: z.enum(['misc', 'users', 'pets']),
  image: z.instanceof(File),
});
