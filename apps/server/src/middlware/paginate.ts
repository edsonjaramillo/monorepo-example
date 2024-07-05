import { createMiddleware } from 'hono/factory';
import { z } from 'zod';

import { zString } from 'validation';

import { JSend } from 'common';

const positiveNonZeroInteger = /^[1-9]\d*$/;

const nonZeroSchema = zString
  .regex(positiveNonZeroInteger, 'Must be a positive integer and non-zero.')
  .optional()
  .transform(numberify);

const PaginationZod = z.object({ limit: nonZeroSchema, page: nonZeroSchema });

const DEFAULT_LIMIT = 25;
const DEFAULT_PAGE = 1;

export function paginate(forced_limit?: number) {
  return createMiddleware(async (c, next) => {
    const query = c.req.query();

    const { data: pagination, success } = PaginationZod.safeParse(query);

    if (!success) {
      return c.json(JSend.error('Invalid pagination parameters'), 400);
    }

    const defaultLimit = forced_limit ?? DEFAULT_LIMIT;

    // All values are guarateeed to be positive integers and non-zero
    const limit = pagination.limit ?? defaultLimit;
    const page = pagination.page ?? DEFAULT_PAGE;

    if (page <= 1) {
      c.set('pagination', { limit, offset: 0, page: 1 });
    } else {
      c.set('pagination', { limit, offset: limit * (page - 1), page });
    }

    await next();
  });
}

function numberify(value?: string) {
  if (!value) {
    return undefined;
  }

  return Number(value);
}
