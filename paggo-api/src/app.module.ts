import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { InvoiceController } from './invoice/invoice.controller';
import { InvoiceService } from './invoice/invoice.service';
import { UserService } from './user/user.service';
import { InvoiceGateway } from './invoice/invoice.gateway';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, InvoiceController],
  providers: [
    AppService,
    PrismaService,
    InvoiceService,
    UserService,
    InvoiceGateway,
  ],
})
export class AppModule {}
