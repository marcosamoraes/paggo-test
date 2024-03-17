import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InvoiceProcessedDto {
  @IsNotEmpty()
  file: string;

  @IsOptional()
  @IsString()
  invoiceNumber: string;

  @IsOptional()
  @IsString()
  invoiceDate: string;

  @IsOptional()
  @IsString()
  dueDate: string;

  @IsOptional()
  @IsString()
  balanceDue: number;

  @IsOptional()
  @IsString()
  metadata: string;
}
