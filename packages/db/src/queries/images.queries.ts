import { desc, eq } from 'drizzle-orm';

import { CacheClient } from 'cache';

import type { Folders } from 'common';

import { Database } from '../client';
import { CORE_IMAGE_COLUMNS } from '../columns/images.columns';
import { ImagesKeys } from '../keys';
import { imagesTable } from '../schema';
import type { ImageAsset, ImageAssetCreate } from '../types/images.types';

export class ImagesQueries {
  private readonly database: Database;
  private readonly cache: CacheClient;
  constructor(database_: Database, cache_: CacheClient) {
    this.database = database_;
    this.cache = cache_;
  }

  async getImages(limit: number, offset: number): Promise<ImageAsset[]> {
    const cachedImagesKey = ImagesKeys.bulk(limit, offset);
    const cachedImages = await this.cache.get<ImageAsset[]>(cachedImagesKey);
    if (cachedImages) {
      return cachedImages;
    }

    const images = await this.database.query.imagesTable.findMany({
      columns: CORE_IMAGE_COLUMNS,
      orderBy: desc(imagesTable.createdAt),
    });

    await this.cache.set(cachedImagesKey, images);

    return images;
  }

  async getImagesByFolder(folder: Folders): Promise<ImageAsset[]> {
    const cachedImagesKey = ImagesKeys.byFolder(folder);

    const cachedImages = await this.cache.get<ImageAsset[]>(cachedImagesKey);
    if (cachedImages) {
      return cachedImages;
    }

    const images = await this.database.query.imagesTable.findMany({
      where: eq(imagesTable.folder, folder),
      columns: CORE_IMAGE_COLUMNS,
      orderBy: desc(imagesTable.createdAt),
    });

    await this.cache.set(cachedImagesKey, images);

    return images;
  }

  async createImage(folder: Folders, data: ImageAssetCreate) {
    await this.cache.cleanPatterns(ImagesKeys.onUpdate());
    await this.database.insert(imagesTable).values({ ...data, folder });
  }
}
