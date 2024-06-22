import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { Logger } from 'common';

import { imagesRouter } from './routers/images.router';
import { usersRouter } from './routers/users.router';
import { serverEnv } from './server.env';

const app = new Hono();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.route('/users', usersRouter);
app.route('/images', imagesRouter);

Logger.info('Server is running on port', serverEnv.PORT);

export { app };
