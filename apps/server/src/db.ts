import { type Database, createDBConnection } from 'db';

import { serverEnv } from './server.env';

export const database: Database = createDBConnection(serverEnv.DATABASE_URL, serverEnv.NODE_ENV);
