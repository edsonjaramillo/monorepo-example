import { Redis } from 'cache';
import { eq } from 'drizzle-orm';

import type { Database } from '../client';
import { SESSIONS_COLUMNS } from '../columns/sessions.columns';
import { USERS_SESSION_COLUMNS } from '../columns/users.columns';
import { sessionsTable } from '../schema';
import { SessionCreate, SessionUpdate, SessionWithUser } from '../types';

export class SessionsQueries {
  private readonly db: Database;
  private readonly cache: Redis;

  constructor(database: Database, redis: Redis) {
    this.db = database;
    this.cache = redis;
  }

  async getSessionById(id: string): Promise<SessionWithUser | undefined> {
    const cachedSession = await this.cache.get<SessionWithUser>(`session:${id}`);
    if (cachedSession) {
      return cachedSession;
    }

    const session = await this.db.query.sessionsTable.findFirst({
      where: eq(sessionsTable.id, id),
      columns: SESSIONS_COLUMNS,
      with: { user: { columns: USERS_SESSION_COLUMNS } },
    });

    if (session) {
      await this.cache.set(`session:${id}`, session);
    }

    return session;
  }

  async createSession(session: SessionCreate) {
    await this.db.insert(sessionsTable).values(session);
  }

  async updateSession(id: string, session: SessionUpdate) {
    await this.db.update(sessionsTable).set(session).where(eq(sessionsTable.id, id)).execute();
  }

  async deleteSession(id: string) {
    await this.cache.delete(`session:${id}`);
    await this.db.delete(sessionsTable).where(eq(sessionsTable.id, id)).execute();
  }
}
