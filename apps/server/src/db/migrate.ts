import { migrate } from 'drizzle-orm/postgres-js/migrator';

import config from '../../drizzle.config';
import { serverEnv } from '../server.env';
import { db, connection } from './client';

if (!serverEnv.DB_MIGRATING) {
  throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

await migrate(db, { migrationsFolder: config.out! });

await connection.end();
