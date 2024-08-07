import type { CORE_IMAGE_COLUMNS } from '../columns/images.columns';
import type { imagesTable } from '../schema';

export type ImageAsset = Pick<typeof imagesTable.$inferSelect, keyof typeof CORE_IMAGE_COLUMNS>;

export type ImageAssetCreate = Omit<ImageAsset, 'folder' | 'createdAt'>;
export type ImageAssetUpdate = Omit<ImageAssetCreate, 'id'>;
