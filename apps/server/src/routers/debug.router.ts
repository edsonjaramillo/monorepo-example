import { Hono } from 'hono';

import { JSend } from 'common';

export const debugRouter = new Hono();

debugRouter.get('/', async (c) => {
  const message = 'Debug route';
  return c.json(JSend.success(undefined, message));
});
