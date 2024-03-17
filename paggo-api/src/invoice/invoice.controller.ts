import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.invoiceService.upload(file);
  }

  @Post('process')
  async processInvoiceResults(@Body() body: any) {
    const invoice = await this.invoiceService.findFirst({
      where: { fileName: body.file },
    });

    if (!invoice) {
      return 'Invoice not found';
    }

    this.invoiceService.update({
      where: { id: invoice.id },
      data: { ...body, processedAt: new Date() },
    });
  }
}