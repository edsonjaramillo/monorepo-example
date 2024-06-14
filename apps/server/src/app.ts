import { Hono } from 'hono';

import { imagesRouter } from './routers/images.router';
import { usersRouter } from './routers/users.router';
import { serverEnv } from './server.env';

const app = new Hono();

app.route('/users', usersRouter);
app.route('/images', imagesRouter);

console.log('Server is running on port', serverEnv.PORT);

export { app };
