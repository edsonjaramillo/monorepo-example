import { asc, eq } from 'drizzle-orm';

import { db } from '../client';
import {
  DEFAULT_CORE_IMAGE_COLUMNS,
  DEFAULT_PET_IMAGE_COLUMNS,
  DEFAULT_USER_IMAGE_COLUMNS,
} from '../columns/images.columns';
import { imagesTable } from '../schema';
import type { ImageAssetCreate, ImageAssetFolders, ImageAssetUpdate } from '../types/images.types';

export class ImagesQueries {
  static async getImages() {
    return await db.query.imagesTable.findMany({
      columns: DEFAULT_CORE_IMAGE_COLUMNS,
      orderBy: asc(imagesTable.createdAt),
    });
  }

  static async getImagesByPrefix(folder: ImageAssetFolders) {
    return await db.query.imagesTable.findMany({
      where: eq(imagesTable.folder, folder),
      columns: DEFAULT_CORE_IMAGE_COLUMNS,
      orderBy: asc(imagesTable.createdAt),
    });
  }

  static async createImage(folder: ImageAssetFolders, data: ImageAssetCreate) {
    return await db.insert(imagesTable).values({ ...data, folder });
  }

  static async updateImage(id: string, data: ImageAssetUpdate) {
    return await db.update(imagesTable).set(data).where(eq(imagesTable.id, id));
  }
}
