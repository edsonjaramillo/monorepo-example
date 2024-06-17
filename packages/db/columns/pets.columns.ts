import { petsTable } from '../schema';
import type { ColumnsSelector } from './shared';

export const PETS_COLUMNS = {
  id: true,
  name: true,
  ownerId: true,
} satisfies ColumnsSelector<typeof petsTable.$inferSelect>;
