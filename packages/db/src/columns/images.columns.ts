import { imagesTable } from '../schema';
import type { ColumnsSelector } from './shared.columns';

export const CORE_IMAGE_COLUMNS = {
  id: true,
  folder: true,
  filename: true,
  url: true,
  blurDataUrl: true,
  height: true,
  width: true,
  createdAt: true,
} satisfies ColumnsSelector<typeof imagesTable.$inferSelect>;

export const USER_IMAGE_COLUMNS = {
  userId: true,
  ...CORE_IMAGE_COLUMNS,
} satisfies ColumnsSelector<typeof imagesTable.$inferSelect>;
