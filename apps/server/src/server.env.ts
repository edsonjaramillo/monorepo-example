import { z } from 'zod';

import { NODE_ENV } from 'validation';

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV),
  PORT: z.string().regex(/^\d+$/).transform(Number),
  DATABASE_URL: z.string().regex(/^postgres:\/\/.*$/),
  BACKBLAZE_ENDPOINT: z.string().trim(),
  BACKBLAZE_REGION: z.string().trim(),
  BACKBLAZE_ACCOUNT_ID: z.string().trim(),
  BACKBLAZE_APPLICATION_KEY: z.string().trim(),
  BACKBLAZE_BUCKET_NAME: z.string().trim(),
});

export const serverEnv = serverEnvSchema.parse(process.env);
