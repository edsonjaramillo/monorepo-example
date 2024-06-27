import type { ErrorHandler } from 'hono';

import { JSend } from 'common';

import { serverEnv } from '../server.env';

export function onError(): ErrorHandler {
  return function (error, c) {
    if (serverEnv.NODE_ENV === 'development') {
      console.error(error);
    }

    return c.json(JSend.error(error.message), 500);
  };
}
