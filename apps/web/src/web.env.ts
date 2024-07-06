import { z } from 'zod';

import { zString } from 'validation';

import { NODE_ENV } from 'common';

const webEnvSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV),
  NEXT_PUBLIC_SERVER_URL: zString,
});

const env = process.env;

export const webEnv = webEnvSchema.parse({
  NODE_ENV: env.NODE_ENV,
  NEXT_PUBLIC_SERVER_URL: env.NEXT_PUBLIC_SERVER_URL,
});
