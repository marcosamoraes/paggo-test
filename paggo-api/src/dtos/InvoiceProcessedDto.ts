import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class InvoiceProcessedDto {
  @IsNotEmpty()
  file: string;

  @IsOptional()
  @IsString()
  invoiceNumber: string;

  @IsOptional()
  @IsDateString()
  invoiceDate: string;

  @IsOptional()
  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsNumber()
  balanceDue: number;

  @IsOptional()
  @IsString()
  metadata: string;
}
