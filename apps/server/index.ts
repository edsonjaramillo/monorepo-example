import { serve } from '@hono/node-server';

import { app } from './src/app';
import { serverEnv } from './src/server.env';

serve({ fetch: app.fetch, port: serverEnv.PORT });
