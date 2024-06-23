import type { SESSIONS_COLUMNS } from '../columns/sessions.columns';
import { sessionsTable } from '../schema';
import type { UserSession } from './users.types';

export type Session = Pick<typeof sessionsTable.$inferSelect, keyof typeof SESSIONS_COLUMNS>;
export type SessionCreate = typeof sessionsTable.$inferInsert;
export type SessionUpdate = Omit<SessionCreate, 'id'>;
export type SessionWithUser = Session & { user: UserSession };
