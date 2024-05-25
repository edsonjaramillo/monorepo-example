import { app } from './src/app';
import { serverEnv } from './src/server.env';

Bun.serve({ fetch: app.fetch, port: serverEnv.PORT });
