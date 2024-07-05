import { Hono } from 'hono';

import { JSend, calculatePaginationDetails } from 'common';

import { paginate } from '../middlware/paginate';
import { usersQueries } from '../utils/query.clients';

export const usersRouter = new Hono();

usersRouter.get('/', paginate(), async (c) => {
  const { limit, offset, page } = c.get('pagination');

  const users = await usersQueries.getUsers(limit, offset);
  const { amountOfRows } = await usersQueries.getUserCounts();
  const pagination = calculatePaginationDetails(page, amountOfRows, limit);

  return c.json(JSend.pagination(users, pagination, 'Users fetched successfully'));
});

usersRouter.get('/:id', async (c) => {
  const { id } = c.req.param();

  const user = await usersQueries.getUserById(id);

  if (!user) {
    return c.json(JSend.error('User not found'), 404);
  }

  return c.json(JSend.success(user, 'User fetched successfully'));
});
