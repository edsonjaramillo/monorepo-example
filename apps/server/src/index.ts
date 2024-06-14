import { serve } from '@hono/node-server';

import { app } from './app';
import { serverEnv } from './server.env';

serve({ fetch: app.fetch, port: serverEnv.PORT });
