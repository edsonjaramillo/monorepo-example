import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { Expiration } from 'common';

import { serverEnv } from '../../server.env';

const DEFAULT_CACHE_SECONDS = Expiration.getDays(365);
const DEFAULT_CACHE_CONTROL = `max-age=${DEFAULT_CACHE_SECONDS}`;

type S3Init = {
  endpoint: string;
  bucketName: string;
};

class S3 {
  endpoint: string;
  bucketName: string;

  constructor(init: S3Init) {
    this.endpoint = init.endpoint;
    this.bucketName = init.bucketName;
  }

  async uploadFile(name: string, buffer: Uint8Array) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: name,
      Body: buffer,
      CacheControl: DEFAULT_CACHE_CONTROL,
    });

    await awsDriver.send(command);
  }

  getUploadUrl(folder: string, filename: string) {
    return `${this.endpoint}/${this.bucketName}/${folder}/${filename}`;
  }
}

export const s3 = new S3({
  endpoint: serverEnv.S3_ENDPOINT,
  bucketName: serverEnv.S3_BUCKET_NAME,
});

const awsDriver = new S3Client({
  endpoint: serverEnv.S3_ENDPOINT,
  forcePathStyle: serverEnv.NODE_ENV === 'development',
  region: serverEnv.S3_REGION,
  credentials: {
    accessKeyId: serverEnv.S3_ACCESS_KEY_ID,
    secretAccessKey: serverEnv.S3_SECRET_ACCESS_KEY_ID,
  },
});
