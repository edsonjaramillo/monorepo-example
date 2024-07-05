import { eq } from 'drizzle-orm';

import { CacheClient } from 'cache';

import type { Database } from '../client';
import { SESSIONS_COLUMNS } from '../columns/sessions.columns';
import { USERS_SESSION_COLUMNS } from '../columns/users.columns';
import { SessionsKeys } from '../keys';
import { sessionsTable } from '../schema';
import { SessionCreate, SessionUpdate, SessionWithUser } from '../types';

export class SessionsQueries {
  private readonly database: Database;
  private readonly cache: CacheClient;

  constructor(database_: Database, cache_: CacheClient) {
    this.database = database_;
    this.cache = cache_;
  }

  async getSessionById(id: string): Promise<SessionWithUser | undefined> {
    const cacheKey = SessionsKeys.byId(id);
    const cachedSession = await this.cache.get<SessionWithUser>(cacheKey);
    if (cachedSession) {
      return cachedSession;
    }

    const session = await this.database.query.sessionsTable.findFirst({
      where: eq(sessionsTable.id, id),
      columns: SESSIONS_COLUMNS,
      with: { user: { columns: USERS_SESSION_COLUMNS } },
    });

    if (session) {
      await this.cache.set(cacheKey, session);
    }

    return session;
  }

  async createSession(session: SessionCreate) {
    await this.database.insert(sessionsTable).values(session);
  }

  async updateSession(id: string, session: SessionUpdate) {
    await this.cache.delete(SessionsKeys.byId(id));
    await this.database
      .update(sessionsTable)
      .set(session)
      .where(eq(sessionsTable.id, id))
      .execute();
  }

  async deleteSession(id: string) {
    await this.cache.delete(SessionsKeys.byId(id));
    await this.database.delete(sessionsTable).where(eq(sessionsTable.id, id)).execute();
  }
}
