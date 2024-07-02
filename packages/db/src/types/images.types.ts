import { folders } from 'common';

import type { CORE_IMAGE_COLUMNS } from '../columns/images.columns';
import { imagesTable } from '../schema';

export type ImageAsset = Pick<typeof imagesTable.$inferSelect, keyof typeof CORE_IMAGE_COLUMNS>;

export type ImageAssetCreate = Omit<ImageAsset, 'folder'>;
export type ImageAssetUpdate = Omit<ImageAssetCreate, 'id'>;

export type ImageAssetFolders = (typeof folders)[number];
