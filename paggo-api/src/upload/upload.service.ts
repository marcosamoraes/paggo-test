import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/s3.service';

@Injectable()
export class UploadService {
  upload(file: Express.Multer.File) {
    const S3ServiceInstance = new S3Service();
    return S3ServiceInstance.uploadFileToS3(file.buffer, file.originalname);
  }
}
