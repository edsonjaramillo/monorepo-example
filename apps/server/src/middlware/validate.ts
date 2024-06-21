import { Context } from 'hono';
import { createMiddleware } from 'hono/factory';
import type { AnyZodObject } from 'zod';

import { JSend } from '../utils/JSend';

type Parse = 'json' | 'query' | 'params';

export function validate(schema: AnyZodObject, parse: Parse = 'json') {
  return createMiddleware(async (c, next) => {
    const data = await bodyToBeChecked(c, parse);

    const { success } = schema.safeParse(data);
    if (!success) {
      // invalid parameters or body status code
      return c.json(JSend.error(`Invalid ${parse} data`), 400);
    }

    await next();
  });
}

async function bodyToBeChecked(c: Context, parse: Parse) {
  switch (parse) {
    case 'json': {
      return c.req.json();
    }

    case 'query': {
      return c.req.query();
    }

    case 'params': {
      return c.req.param();
    }
  }
}
