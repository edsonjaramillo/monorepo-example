import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import type { NodeEnv } from 'validation';

import * as schema from './schema';

function maxPoolCountByEnviroment(env: NodeEnv) {
  switch (env) {
    case 'development':
      return 1;
    case 'production':
      return undefined;
    case 'staging':
      return undefined;
    case 'test':
      return 1;
    default:
      console.error(`Unknown NODE_ENV: ${env}`);
      return 1;
  }
}

export type DB = ReturnType<typeof drizzle<typeof schema>>;
export function createDBConnection(connectionString: string, env: NodeEnv) {
  const connection = postgres(connectionString, {
    max: maxPoolCountByEnviroment(env),
  });
  return drizzle(connection, { schema });
}
