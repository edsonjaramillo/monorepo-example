import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { Logger } from 'common';

import { onError } from './middlware/onError';
import { sessionify } from './middlware/sessionify';
import { publicAuthRouter, userAuthRouter } from './routers/auth.router';
import { debugRouter } from './routers/debug.router';
import { employeeImagesRouter } from './routers/images.router';
import { adminUsersRouter, usersSelfRouter } from './routers/users.router';
import { serverEnv } from './server.env';

const app = new Hono();

if (serverEnv.NODE_ENV === 'development') {
  app.use(logger());
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// session verification middleware
app.use('/user/*', sessionify(['admin', 'employee', 'user']));
app.use('/employee/*', sessionify(['admin', 'employee']));
app.use('/admin/*', sessionify(['admin']));

// user routers
app.route('/admin/users', adminUsersRouter);
app.route('/user/self', usersSelfRouter);

// images router
app.route('/employee/images', employeeImagesRouter);

// auth routers
app.route('/auth', publicAuthRouter);
app.route('/user/auth', userAuthRouter);

// debug router
app.route('/debug', debugRouter);

app.onError(onError());

Logger.info('Server is running on port', serverEnv.PORT);

export { app };
