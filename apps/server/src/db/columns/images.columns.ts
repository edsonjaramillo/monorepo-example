import { imagesTable } from '../schema';
import type { ColumnsSelector } from './shared';

export const CORE_IMAGE_COLUMNS = {
  id: true,
  folder: true,
  filename: true,
  url: true,
  height: true,
  width: true,
} satisfies ColumnsSelector<typeof imagesTable.$inferSelect>;

export const USER_IMAGE_COLUMNS = {
  userId: true,
  ...CORE_IMAGE_COLUMNS,
} satisfies ColumnsSelector<typeof imagesTable.$inferSelect>;

export const PET_IMAGE_COLUMNS = {
  petId: true,
  ...CORE_IMAGE_COLUMNS,
} satisfies ColumnsSelector<typeof imagesTable.$inferSelect>;
