import { IsNotEmpty } from 'class-validator';

export class InvoiceProcessedDto {
  @IsNotEmpty()
  file: string;

  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  balanceDue: number;
  metadata: string;
}
