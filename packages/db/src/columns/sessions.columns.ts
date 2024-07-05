import { sessionsTable } from '../schema';
import type { ColumnsSelector } from './shared.columns';

export const SESSIONS_COLUMNS = {
  id: true,
  expiresAt: true,
} satisfies ColumnsSelector<typeof sessionsTable.$inferSelect>;
