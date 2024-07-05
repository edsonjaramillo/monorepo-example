import { type Database, createDBConnection } from 'db';

import { CacheClient } from 'cache';

import { serverEnv } from './server.env';

export const database: Database = createDBConnection(serverEnv.DATABASE_URL, serverEnv.NODE_ENV);
export const cache = new CacheClient({
  url: serverEnv.REDIS_URL,
  debug: serverEnv.REDIS_DEBUG,
  skipCache: serverEnv.REDIS_SKIP_CACHE,
});
