import { defineConfig } from 'drizzle-kit';

import { serverEnv } from './src/server.env';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: serverEnv.DATABASE_URL },
  verbose: true,
  strict: true,
});
