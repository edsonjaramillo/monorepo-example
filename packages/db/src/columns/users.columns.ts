import { usersTable } from '../schema';
import type { ColumnsSelector } from './shared';

export const USERS_COLUMNS = {
  id: true,
  name: true,
  email: true,
} satisfies ColumnsSelector<typeof usersTable.$inferSelect>;

export const USERS_SESSION_COLUMNS = {
  id: true,
  email: true,
  name: true,
} satisfies ColumnsSelector<typeof usersTable.$inferSelect>;

export const USERS_CREDENTIALS_COLUMNS = {
  id: true,
  email: true,
  password: true,
} satisfies ColumnsSelector<typeof usersTable.$inferSelect>;
