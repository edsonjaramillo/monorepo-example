import { Hono } from 'hono';

import { UsersQueries } from '../db/queries/users.queries';
import { JSend } from '../utils/JSend';

export const usersRouter = new Hono();

usersRouter.get('/users', async (c) => {
  const users = await UsersQueries.getUsers();

  return c.json(JSend.success(users, 'Users fetched successfully'));
});

usersRouter.get('/users/:id', async (c) => {
  const id = c.req.param('id');

  const user = await UsersQueries.getUserById(id);

  if (!user) {
    return c.json(JSend.error('User not found'), 404);
  }

  return c.json(JSend.success(user, 'User fetched successfully'));
});

usersRouter.get('/users/:id/pets', async (c) => {
  const id = c.req.param('id');

  const user = await UsersQueries.getUserWithPets(id);

  if (!user) {
    return c.json(JSend.error('User not found'), 404);
  }

  return c.json(JSend.success(user, 'User fetched successfully'));
});
