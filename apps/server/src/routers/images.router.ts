import { Hono } from 'hono';
import sharp from 'sharp';
import { uuidv7 } from 'uuidv7';

import { ImagesQueries } from 'db/src/queries/images.queries';
import type { ImageAssetFolders } from 'db/src/types/images.types';

import { zUploadImageFormSchema } from 'validation/src/misc/images.validation';

import { db } from '../db';
import { JSend } from '../utils/JSend';
import { backblaze } from '../utils/backblaze/Backblaze';
import { placeholder } from '../utils/image/Placeholder';

export const imagesRouter = new Hono();
const imageQueries = new ImagesQueries(db);

imagesRouter.get('/upload', async (c) => {
  const { data, success } = zUploadImageFormSchema.safeParse(await c.req.parseBody());
  if (!success) {
    throw Error('Invalid form data');
  }

  const { image, folder } = data;

  const id = uuidv7();
  const convertedImageType = 'webp';
  const filename = id + '.' + convertedImageType;

  const originalImageBuffer = sharp(await image.arrayBuffer());
  const { width, height } = await originalImageBuffer.metadata();
  if (!width || !height) {
    throw Error('Failed to get image metadata');
  }

  const webpBuffer = await originalImageBuffer.toFormat(convertedImageType).toBuffer();

  const uploadSuccessful = await backblaze.uploadFile(filename, webpBuffer);
  if (!uploadSuccessful) {
    throw Error('Failed to upload file to backblaze');
  }

  const url = backblaze.getUploadUrl(folder, filename);

  const blurDataUrl = await placeholder.imageToBase64(url, width, height);

  await imageQueries.createImage(folder, { id, filename, height, width, url, blurDataUrl });

  return c.json(JSend.success({}, 'File uploaded successfully'));
});

imagesRouter.get('/:id', async (c) => {
  const id = c.req.param('id') as ImageAssetFolders;
  const images = await imageQueries.getImagesByFolder(id);
  return c.json(JSend.success(images, 'Images fetched successfully'));
});
