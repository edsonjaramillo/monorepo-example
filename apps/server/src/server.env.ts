import { z } from 'zod';

import { zString, zStringToBoolean } from 'validation';

import { NODE_ENV } from 'common';

const serverEnvSchema = z.object({
  WEB_URL: zString,
  NODE_ENV: z.enum(NODE_ENV),
  PORT: zString.regex(/^\d+$/).transform(Number),
  DATABASE_URL: zString.regex(/^postgres:\/\/.*$/),
  S3_ENDPOINT: zString,
  S3_REGION: zString,
  S3_ACCESS_KEY_ID: zString,
  S3_SECRET_ACCESS_KEY_ID: zString,
  S3_BUCKET_NAME: zString,
  REDIS_URL: zString.regex(/^redis:\/\/.*$/),
  REDIS_DEBUG: zStringToBoolean,
  REDIS_SKIP_CACHE: zStringToBoolean,
});

export const serverEnv = serverEnvSchema.parse(process.env);
