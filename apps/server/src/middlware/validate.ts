import { Context } from 'hono';
import { createMiddleware } from 'hono/factory';
import type { AnyZodObject } from 'zod';

import { JSend, Logger } from 'common';

import { serverEnv } from '../server.env';

type Parse = 'json' | 'query' | 'params' | 'form';
const isDevelopment = serverEnv.NODE_ENV === 'development';

export function validate(schema: AnyZodObject, parse: Parse = 'json') {
  return createMiddleware(async (c, next) => {
    const data = await bodyToBeChecked(c, parse);

    const { success, error } = schema.safeParse(data);
    if (!success) {
      if (isDevelopment) {
        Logger.error(error.errors);
      }

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

    case 'form': {
      return c.req.parseBody();
    }
  }
}
