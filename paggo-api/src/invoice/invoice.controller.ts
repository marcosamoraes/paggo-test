import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  Get,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { InvoiceProcessedDto } from 'src/dtos/InvoiceProcessedDto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.invoiceService.upload(file);
  }

  @Post('process')
  async processInvoiceResults(
    @Body() invoiceProcessedDto: InvoiceProcessedDto,
    @Res() res: any,
  ) {
    const result = await this.invoiceService.updateResults(invoiceProcessedDto);
    return res.status(200).send(result);
  }

  @Get()
  async getInvoices(@Res() res: any) {
    const result = await this.invoiceService.get({ orderBy: { id: 'desc' } });
    return res.status(200).send(result);
  }
}
