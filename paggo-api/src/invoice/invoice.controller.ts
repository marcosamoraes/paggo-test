import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { InvoiceProcessedDto } from 'src/dtos/InvoiceProcessedDto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@Request() req: any, @UploadedFile() file: Express.Multer.File) {
    return this.invoiceService.upload(file, req.user.sub);
  }

  @Post('process')
  async processInvoiceResults(
    @Body() invoiceProcessedDto: InvoiceProcessedDto,
    @Res() res: any,
  ) {
    const result = await this.invoiceService.updateResults(invoiceProcessedDto);
    return res.status(200).send(result);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getInvoices(@Request() req: any, @Res() res: any) {
    const result = await this.invoiceService.get({
      where: { userId: req.user.sub },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).send(result);
  }
}
