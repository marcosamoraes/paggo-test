import { IsNotEmpty, IsString } from 'class-validator';

export class InvoiceProcessedDto {
  @IsNotEmpty()
  file: string;

  @IsString()
  invoiceNumber: string;

  @IsString()
  invoiceDate: string;

  @IsString()
  dueDate: string;

  @IsString()
  balanceDue: number;

  @IsString()
  metadata: string;
}
