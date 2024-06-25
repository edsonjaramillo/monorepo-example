import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';

import type { UserRoles } from 'db';

import { JSend } from 'common';

import { sessionsQueries } from '../utils/query.clients';

export function sessionify(allowedRoles: UserRoles[]) {
  return createMiddleware(async (c, next) => {
    const sessionId = getCookie(c, 'session');
    if (!sessionId) {
      return c.json(JSend.error('Unauthenticated'), 401);
    }

    const session = await sessionsQueries.getSessionById(sessionId);
    if (!session) {
      return c.json(JSend.error('Unauthenticated'), 401);
    }

    if (!allowedRoles.includes(session.user.role)) {
      return c.json(JSend.error('Unauthorized'), 403);
    }

    c.set('session', session);
    await next();
  });
}
