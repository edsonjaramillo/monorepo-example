import heicConvert from 'heic-convert';
import { Hono } from 'hono';
import sharp from 'sharp';
import { uuidv7 } from 'uuidv7';
import { z } from 'zod';

import { zFolderEnum, zUploadImageFormServerSchema } from 'validation';

import { JSend, folders } from 'common';

import { zValidator } from '../middlware/zValidate';
import { backblaze } from '../utils/backblaze/Backblaze';
import { Placeholder } from '../utils/image/Placeholder';
import { imagesQueries } from '../utils/query.clients';

const CONVERTED_IMAGE_TYPE = 'webp';

/** 10MB in integer form */
const MAX_IMAGE_SIZE = 10_485_760;

export const employeeImagesRouter = new Hono();

employeeImagesRouter.post('/upload', async (c) => {
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

  const blurDataUrl = await Placeholder.imageToBase64(url, width, height);

  await imagesQueries.createImage(folder, { id, filename, height, width, url, blurDataUrl });

  return c.json(JSend.success(undefined, 'File uploaded successfully'));
});

const zGetImagesByFolder = z.object({
  folder: zFolderEnum,
});

employeeImagesRouter.get('/:folder', zValidator(zGetImagesByFolder, 'param'), async (c) => {
  const { folder } = c.req.valid('param');
  const images = await imagesQueries.getImagesByFolder(folder);
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
