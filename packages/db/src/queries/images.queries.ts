import { asc, eq } from 'drizzle-orm';

import { Database } from '../client';
import { CORE_IMAGE_COLUMNS } from '../columns/images.columns';
import { imagesTable } from '../schema';
import type {
  ImageAsset,
  ImageAssetCreate,
  ImageAssetFolders,
  ImageAssetUpdate,
} from '../types/images.types';

export class ImagesQueries {
  private readonly db: Database;
  constructor(database: Database) {
    this.db = database;
  }

  async getImages(): Promise<ImageAsset[]> {
    return this.db.query.imagesTable.findMany({
      columns: CORE_IMAGE_COLUMNS,
      orderBy: asc(imagesTable.createdAt),
    });
  }

  async getImagesByFolder(folder: ImageAssetFolders): Promise<ImageAsset[]> {
    return this.db.query.imagesTable.findMany({
      where: eq(imagesTable.folder, folder),
      columns: CORE_IMAGE_COLUMNS,
      orderBy: asc(imagesTable.createdAt),
    });
  }

  async createImage(folder: ImageAssetFolders, data: ImageAssetCreate) {
    await this.db.insert(imagesTable).values({ ...data, folder });
  }

  async updateImage(id: string, data: ImageAssetUpdate) {
    await this.db.update(imagesTable).set(data).where(eq(imagesTable.id, id));
  }
}
