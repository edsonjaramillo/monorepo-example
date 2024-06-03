import { Hono } from 'hono';

import { UsersQueries } from '../db/queries/users.queries';

export const usersRouter = new Hono();

usersRouter.get('/users', async (c) => {
  const users = await UsersQueries.getUsers();

  return c.json({ users });
});

usersRouter.get('/users/:id', async (c) => {
  const id = c.req.param('id');

  const user = await UsersQueries.getUserById(id);

  if (!user) {
    return c.json({ user }, 404);
  }

  return c.json({ user });
});
