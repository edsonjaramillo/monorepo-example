import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { serverEnv } from '../../server.env';

type BackblazeInit = {
  endpoint: string;
  bucketName: string;
};

const s3 = new S3Client({
  endpoint: serverEnv.BACKBLAZE_ENDPOINT,
  region: serverEnv.BACKBLAZE_REGION,
  credentials: {
    accessKeyId: serverEnv.BACKBLAZE_ACCOUNT_ID,
    secretAccessKey: serverEnv.BACKBLAZE_APPLICATION_KEY,
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
    const command = new PutObjectCommand({ Bucket: this.bucketName, Key: name, Body: buffer });
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

  getUploadUrl(folder: string, filename: string) {
    return `${this.endpoint}/${this.bucketName}/${folder}/${filename}`;
  }
}

export const backblaze = new Backblaze({
  endpoint: serverEnv.BACKBLAZE_ENDPOINT,
  bucketName: serverEnv.BACKBLAZE_BUCKET_NAME,
});
