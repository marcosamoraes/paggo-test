import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
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
  async processInvoiceResults(@Body() body: any, @Res() res: any) {
    const invoice = await this.invoiceService.findFirst({
      where: { fileName: body.file },
    });

    if (!invoice) {
      return res.status(404).send('Invoice not found');
    }

    await this.invoiceService.update({
      where: { id: invoice.id },
      data: { processedAt: new Date() },
    });

    return res.status(200).send({
      message: 'Invoice processed successfully',
      invoice: invoice,
    });
  }
}
