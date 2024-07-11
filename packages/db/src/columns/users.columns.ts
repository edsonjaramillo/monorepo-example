import type { usersTable } from '../schema';
import type { ColumnsSelector } from './shared.columns';

export const USERS_COLUMNS = {
  id: true,
  name: true,
  email: true,
  role: true,
} satisfies ColumnsSelector<typeof usersTable.$inferSelect>;

export const USERS_SESSION_COLUMNS = {
  id: true,
  email: true,
  name: true,
  role: true,
} satisfies ColumnsSelector<typeof usersTable.$inferSelect>;

export const USERS_CREDENTIALS_COLUMNS = {
  id: true,
  email: true,
  password: true,
} satisfies ColumnsSelector<typeof usersTable.$inferSelect>;
