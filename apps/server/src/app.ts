import { Hono } from 'hono';

import { serverEnv } from './server.env';

const app = new Hono();

console.log('Server is running on port', serverEnv.PORT);

export { app };
