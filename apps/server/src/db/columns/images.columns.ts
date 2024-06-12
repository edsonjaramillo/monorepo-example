import { imagesTable } from '../schema';
import type { ColumnsSelector } from './shared';

export const DEFAULT_CORE_IMAGE_COLUMNS = {
  id: true,
  folder: true,
  filename: true,
  url: true,
  height: true,
  width: true,
} satisfies ColumnsSelector<typeof imagesTable.$inferSelect>;

export const DEFAULT_USER_IMAGE_COLUMNS = {
  userId: true,
  ...DEFAULT_CORE_IMAGE_COLUMNS,
} satisfies ColumnsSelector<typeof imagesTable.$inferSelect>;

export const DEFAULT_PET_IMAGE_COLUMNS = {
  petId: true,
  ...DEFAULT_CORE_IMAGE_COLUMNS,
} satisfies ColumnsSelector<typeof imagesTable.$inferSelect>;
