import { usersTable } from '../schema';
import type { ColumnsSelector } from './shared';

export const USERS_COLUMNS = {
  id: true,
  name: true,
} satisfies ColumnsSelector<typeof usersTable.$inferSelect>;
