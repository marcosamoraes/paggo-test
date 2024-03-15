import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UploadService } from './upload/upload.service';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UploadController],
  providers: [AppService, UploadService],
})
export class AppModule {}
