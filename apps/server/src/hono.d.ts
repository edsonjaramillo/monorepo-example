import { ContextVariableMap } from 'hono';

import type { SessionWithUser } from 'db';

declare module 'hono' {
  interface ContextVariableMap {
    session: SessionWithUser;
  }
}
