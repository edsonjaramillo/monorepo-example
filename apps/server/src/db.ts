import type { DB } from 'db';
import { createDBConnection } from 'db';

import { serverEnv } from './server.env';

export const db: DB = createDBConnection(serverEnv.DATABASE_URL, serverEnv.NODE_ENV);
