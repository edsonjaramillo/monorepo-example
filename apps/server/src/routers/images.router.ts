import heicConvert from 'heic-convert';
import { Hono } from 'hono';
import sharp from 'sharp';
import { uuidv7 } from 'uuidv7';
import { z } from 'zod';

import { type ImageAssetFolders, folders } from 'db';

import { zUploadImageFormServerSchema } from 'validation';

import { JSend } from 'common';

import { backblaze } from '../utils/backblaze/Backblaze';
import { placeholder } from '../utils/image/Placeholder';
import { imagesQueries } from '../utils/query.clients';

export const imagesRouter = new Hono();

const CONVERTED_IMAGE_TYPE = 'webp';

/** 10MB in integer form */
const MAX_IMAGE_SIZE = 10_485_760;

imagesRouter.post('/upload', async (c) => {
  const body = await c.req.parseBody();

  const { success: validFormData, data: formData } = zUploadImageFormServerSchema.safeParse(body);
  if (!validFormData) {
    throw new Error('Invalid form data');
  }

  // if the size of the image is greater than 10MB then throw an error
  if (formData.image.size > MAX_IMAGE_SIZE) {
    throw new Error('Image size is greater than 10MB');
  }

  const { success: isValidFolder, data: folder } = z.enum(folders).safeParse(formData.folder);
  if (!isValidFolder) {
    throw new Error('Invalid folder');
  }

  const id = uuidv7();
  const filename = `${folder}/${id}.${CONVERTED_IMAGE_TYPE}`;

  const originalImageBuffer = await getBuffer(formData.image);
  const { width, height } = await originalImageBuffer.metadata();
  if (!width || !height) {
    throw new Error('Failed to get image metadata');
  }

  const webpBuffer = await originalImageBuffer.toFormat(CONVERTED_IMAGE_TYPE).toBuffer();

  await backblaze.uploadFile(filename, webpBuffer);

  const url = backblaze.getUploadUrl(filename);

  const blurDataUrl = await placeholder.imageToBase64(url, width, height);

  await imagesQueries.createImage(folder, { id, filename, height, width, url, blurDataUrl });

  return c.json(JSend.success(undefined, 'File uploaded successfully'));
});

imagesRouter.get('/:id', async (c) => {
  const id = c.req.param('id') as ImageAssetFolders;
  const images = await imagesQueries.getImagesByFolder(id);
  return c.json(JSend.success(images, 'Images fetched successfully'));
});

async function getBuffer(image: File) {
  const isHeic = image.type === 'image/heic';

  if (isHeic) {
    const buffer = await heicConvert({
      format: 'JPEG',
      buffer: new Uint8Array(await image.arrayBuffer()),
      quality: 1,
    });

    return sharp(buffer);
  }

  return sharp(await image.arrayBuffer());
}
