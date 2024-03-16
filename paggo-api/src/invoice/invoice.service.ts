import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoiceService {
  store(data: any) {
    console.log('Processing invoice data', data);
  }
}
