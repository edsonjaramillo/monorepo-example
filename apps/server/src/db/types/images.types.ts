import type { DEFAULT_CORE_IMAGE_COLUMNS } from '../columns/images.columns';
import { folders, imagesTable } from '../schema';

export type ImageAsset = Pick<
  typeof imagesTable.$inferSelect,
  keyof typeof DEFAULT_CORE_IMAGE_COLUMNS
>;

export type ImageAssetCreate = Omit<ImageAsset, 'id'>;
export type ImageAssetUpdate = Omit<ImageAssetCreate, 'id'>;

export type ImageAssetFolders = (typeof folders)[number];
