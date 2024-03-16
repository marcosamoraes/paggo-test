import { Controller, Post, Body } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('process')
  processInvoiceResults(@Body() body: any) {
    this.invoiceService.store(body.data);
  }
}
