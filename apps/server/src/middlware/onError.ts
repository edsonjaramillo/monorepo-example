import type { ErrorHandler } from 'hono';

import { JSend } from 'common';

export function onError(): ErrorHandler {
  return function (error, c) {
    return c.json(JSend.error(error.message), 500);
  };
}
