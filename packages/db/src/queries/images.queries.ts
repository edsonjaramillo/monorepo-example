import { asc, eq } from 'drizzle-orm';

import { DB } from '../client';
import { CORE_IMAGE_COLUMNS } from '../columns/images.columns';
import { imagesTable } from '../schema';
import type { ImageAssetCreate, ImageAssetFolders, ImageAssetUpdate } from '../types/images.types';

export class ImagesQueries {
  private db: DB;
  constructor(db: DB) {
    this.db = db;
  }
  async getImages() {
    return await this.db.query.imagesTable.findMany({
      columns: CORE_IMAGE_COLUMNS,
      orderBy: asc(imagesTable.createdAt),
    });
  }

  async getImagesByFolder(folder: ImageAssetFolders) {
    return await this.db.query.imagesTable.findMany({
      where: eq(imagesTable.folder, folder),
      columns: CORE_IMAGE_COLUMNS,
      orderBy: asc(imagesTable.createdAt),
    });
  }

  async createImage(folder: ImageAssetFolders, data: ImageAssetCreate) {
    return await this.db.insert(imagesTable).values({ ...data, folder });
  }

  async updateImage(id: string, data: ImageAssetUpdate) {
    return await this.db.update(imagesTable).set(data).where(eq(imagesTable.id, id));
  }
}
