import { createDBConnection } from 'db/src/client';

import { serverEnv } from './server.env';

export const db = createDBConnection(serverEnv.DATABASE_URL, serverEnv.NODE_ENV);
