import { Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  PutObjectCommandOutput,
  S3,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFileToS3(
    file: Buffer,
    fileName: string,
  ): Promise<PutObjectCommandOutput> {
    const input = {
      Body: file,
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
    };
    const command = new PutObjectCommand(input);
    return await this.s3.send(command);
  }
}
