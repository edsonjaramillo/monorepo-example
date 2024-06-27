import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { Expiration } from 'common';

import { serverEnv } from '../../server.env';

const DEFAULT_CACHE_SECONDS = Expiration.getDays(365);
const DEFAULT_CACHE_CONTROL = `max-age=${DEFAULT_CACHE_SECONDS}`;

type BackblazeInit = {
  endpoint: string;
  bucketName: string;
};

const s3 = new S3Client({
  endpoint: serverEnv.S3_ENDPOINT,
  forcePathStyle: serverEnv.NODE_ENV === 'development',
  region: serverEnv.S3_REGION,
  credentials: {
    accessKeyId: serverEnv.S3_ACCESS_KEY_ID,
    secretAccessKey: serverEnv.S3_SECRET_ACCESS_KEY_ID,
  },
});

class Backblaze {
  endpoint: string;
  bucketName: string;

  constructor(init: BackblazeInit) {
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
    try {
      const response = await s3.send(command);
      if (response.$metadata.httpStatusCode === 200) {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  getUploadUrl(filename: string) {
    return `${this.endpoint}/${this.bucketName}/${filename}`;
  }
}

export const backblaze = new Backblaze({
  endpoint: serverEnv.S3_ENDPOINT,
  bucketName: serverEnv.S3_BUCKET_NAME,
});
