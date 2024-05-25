import { z } from 'zod';

const NODE_ENV = ['development', 'test', 'staging', 'production'] as const;

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV),
  PORT: z.string().regex(/^\d+$/).transform(Number),
});

export const serverEnv = serverEnvSchema.parse(process.env);
