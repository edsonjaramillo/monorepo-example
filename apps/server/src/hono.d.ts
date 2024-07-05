import { ContextVariableMap } from 'hono';

import type { SessionWithUser } from 'db';

import { PaginationVariable } from 'common';

declare module 'hono' {
  interface ContextVariableMap {
    session: SessionWithUser;
    pagination: PaginationVariable;
  }
}
