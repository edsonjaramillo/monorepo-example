import { Hono } from 'hono';

import { UsersQueries } from 'db/queries';

import { db } from '../db';
import { JSend } from '../utils/JSend';

export const usersRouter = new Hono();
const usersQueries = new UsersQueries(db);

usersRouter.get('/', async (c) => {
  const users = await usersQueries.getUsers();

  return c.json(JSend.success(users, 'Users fetched successfully'));
});

usersRouter.get('/:id', async (c) => {
  const id = c.req.param('id');

  const user = await usersQueries.getUserById(id);

  if (!user) {
    return c.json(JSend.error('User not found'), 404);
  }

  return c.json(JSend.success(user, 'User fetched successfully'));
});

usersRouter.get('/:id/pets', async (c) => {
  const id = c.req.param('id');

  const user = await usersQueries.getUserWithPets(id);

  if (!user) {
    return c.json(JSend.error('User not found'), 404);
  }

  return c.json(JSend.success(user, 'User fetched successfully'));
});
