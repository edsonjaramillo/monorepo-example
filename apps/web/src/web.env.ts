import { z } from 'zod';

import { zString } from 'validation';

import { NODE_ENV } from 'common';

const webEnvSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV),
  SERVER_URL: zString,
});

export const webEnv = webEnvSchema.parse(process.env);
