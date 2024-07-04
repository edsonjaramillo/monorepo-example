import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { Logger } from 'common';

import { onError } from './middlware/onError';
import { sessionify } from './middlware/sessionify';
import { publicAuthRouter, userAuthRouter } from './routers/auth.router';
import { debugRouter } from './routers/debug.router';
import { employeeImagesRouter } from './routers/images.router';
import { usersRouter } from './routers/users.router';
import { serverEnv } from './server.env';

const app = new Hono();

if (serverEnv.NODE_ENV === 'development') {
  app.use(logger());
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/user/*', sessionify(['admin', 'employee', 'user']));
app.use('/employee/*', sessionify(['admin', 'employee']));
app.use('/admin/*', sessionify(['admin']));

app.route('/users', usersRouter);
app.route('/employee/images', employeeImagesRouter);

app.route('/auth', publicAuthRouter);
app.route('/user/auth', userAuthRouter);

app.route('/debug', debugRouter);

app.onError(onError());

Logger.info('Server is running on port', serverEnv.PORT);

export { app };
