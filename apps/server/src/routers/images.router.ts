import { Hono } from 'hono';
import sharp from 'sharp';
import { uuidv7 } from 'uuidv7';

import { type ImageAssetFolders } from 'db';

import { zUploadImageFormSchema } from 'validation';

import { JSend } from 'common';

import { backblaze } from '../utils/backblaze/Backblaze';
import { placeholder } from '../utils/image/Placeholder';
import { imagesQueries } from '../utils/query.clients';

export const imagesRouter = new Hono();

const CONVERTED_IMAGE_TYPE = 'webp';

imagesRouter.post('/upload', async (c) => {
  const { data, success } = zUploadImageFormSchema.safeParse(await c.req.parseBody());
  if (!success) {
    throw new Error('Invalid form data');
  }

  const { image, folder } = data;

  const id = uuidv7();
  const filename = id + '.' + CONVERTED_IMAGE_TYPE;

  const originalImageBuffer = sharp(await image.arrayBuffer());
  const { width, height } = await originalImageBuffer.metadata();
  if (!width || !height) {
    throw new Error('Failed to get image metadata');
  }

  const webpBuffer = await originalImageBuffer.toFormat(CONVERTED_IMAGE_TYPE).toBuffer();

  const uploadSuccessful = await backblaze.uploadFile(filename, webpBuffer);
  if (!uploadSuccessful) {
    throw new Error('Failed to upload file to backblaze');
  }

  const url = backblaze.getUploadUrl(folder, filename);

  const blurDataUrl = await placeholder.imageToBase64(url, width, height);

  await imagesQueries.createImage(folder, { id, filename, height, width, url, blurDataUrl });

  return c.json(JSend.success({}, 'File uploaded successfully'));
});

imagesRouter.get('/:id', async (c) => {
  const id = c.req.param('id') as ImageAssetFolders;
  const images = await imagesQueries.getImagesByFolder(id);
  return c.json(JSend.success(images, 'Images fetched successfully'));
});
