import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { serverEnv } from '../server.env';
import * as schema from './schema';

function maxPoolCountByEnviroment() {
  if (serverEnv.DB_MIGRATING || serverEnv.DB_SEEDING) {
    console.log('Running in migration or seeding mode, using max pool count of 1');
    return 1;
  }

  switch (serverEnv.NODE_ENV) {
    case 'development':
      return 1;
    case 'production':
      return undefined;
    case 'staging':
      return undefined;
    case 'test':
      return 1;
    default:
      console.error(`Unknown NODE_ENV: ${serverEnv.NODE_ENV}`);
      return 1;
  }
}

export const connection = postgres(serverEnv.DATABASE_URL, {
  max: maxPoolCountByEnviroment(),
  onnotice: serverEnv.DB_SEEDING ? () => {} : undefined,
});

export const db = drizzle(connection, { schema });
