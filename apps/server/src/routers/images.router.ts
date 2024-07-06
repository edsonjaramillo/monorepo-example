import heicConvert from 'heic-convert';
import { Hono } from 'hono';
import sharp from 'sharp';
import { uuidv7 } from 'uuidv7';
import { z } from 'zod';

import { zFolderEnum, zUploadImageFormServerSchema } from 'validation';

import { JSend } from 'common';

import { zValidator } from '../middlware/zValidate';
import { Placeholder } from '../utils/image/Placeholder';
import { imagesQueries } from '../utils/query.clients';
import { s3 } from '../utils/s3/S3';

const CONVERTED_IMAGE_TYPE = 'webp';

/** 10MB in integer form */
const MAX_IMAGE_SIZE = 10_485_760;

export const employeeImagesRouter = new Hono();

employeeImagesRouter.post(
  '/upload',
  zValidator(zUploadImageFormServerSchema, 'form'),
  async (c) => {
    const { folder, image } = c.req.valid('form');

    // if the size of the image is greater than 10MB then throw an error
    if (image.size > MAX_IMAGE_SIZE) {
      throw new Error('Image size is greater than 10MB');
    }

    const id = uuidv7();
    const filename = `${id}.${CONVERTED_IMAGE_TYPE}`;
    const withFolder = `${folder}/${filename}`;

    const originalImageBuffer = await getBuffer(image);
    const { width, height } = await originalImageBuffer.metadata();
    if (!width || !height) {
      throw new Error('Failed to get image metadata');
    }

    const webpBuffer = await originalImageBuffer.toFormat(CONVERTED_IMAGE_TYPE).toBuffer();

    await s3.uploadFile(withFolder, webpBuffer);

    const url = s3.getUploadUrl(folder, filename);

    const blurDataUrl = await Placeholder.imageToBase64(url, width, height);

    await imagesQueries.createImage(folder, { id, filename, height, width, url, blurDataUrl });

    return c.json(JSend.success(undefined, 'File uploaded successfully'));
  },
);

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
