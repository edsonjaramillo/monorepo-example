import { z } from 'zod';

const NODE_ENV = ['development', 'production', 'staging', 'test'] as const;

const zBoolean = z
  .string()
  .regex(/^(true|false)$/i)
  .optional()
  .transform((value) => value === 'true');

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV),
  PORT: z.string().regex(/^\d+$/).transform(Number),
  DATABASE_URL: z.string().regex(/^postgres:\/\/.*$/),
  DB_MIGRATING: zBoolean,
  DB_SEEDING: zBoolean,
});

export const serverEnv = serverEnvSchema.parse(process.env);
