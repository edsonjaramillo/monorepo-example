import { type Database, createDBConnection } from 'db';

import { Redis } from 'cache';

import { serverEnv } from './server.env';

export const database: Database = createDBConnection(serverEnv.DATABASE_URL, serverEnv.NODE_ENV);
export const cache = new Redis({ url: 'redis://localhost:6379', debug: true, skipCache: false });
