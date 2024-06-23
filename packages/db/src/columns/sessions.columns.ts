import { sessionsTable } from '../schema';
import type { ColumnsSelector } from './shared';

export const SESSIONS_COLUMNS = {
  id: true,
  expiresAt: true,
} satisfies ColumnsSelector<typeof sessionsTable.$inferSelect>;
