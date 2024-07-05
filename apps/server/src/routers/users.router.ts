import { Hono } from 'hono';

import { zSelfUpdateUserSchema } from 'validation';

import { JSend, calculatePaginationDetails } from 'common';

import { paginate } from '../middlware/paginate';
import { zValidator } from '../middlware/zValidate';
import { usersQueries } from '../utils/query.clients';

export const adminUsersRouter = new Hono();

adminUsersRouter.get('/', paginate(), async (c) => {
  const { limit, offset, page } = c.get('pagination');

  const users = await usersQueries.getUsers(limit, offset);
  const { amountOfRows } = await usersQueries.getUserCounts();
  const pagination = calculatePaginationDetails(page, amountOfRows, limit);

  return c.json(JSend.pagination(users, pagination, 'Users fetched successfully'));
});

export const usersSelfRouter = new Hono();

usersSelfRouter.get('/', async (c) => {
  const session = c.get('session');

  const user = await usersQueries.getUserById(session.user.id);
  if (!user) {
    return c.json(JSend.error('User not found'), 404);
  }

  return c.json(JSend.success(user, 'User fetched successfully'));
});

usersSelfRouter.put('/update', zValidator(zSelfUpdateUserSchema, 'json'), async (c) => {
  const body = c.req.valid('json');
  const session = c.get('session');

  await usersQueries.selfUpdateUser(session.user.id, body);

  return c.json(JSend.success(undefined, 'User updated successfully'));
});
