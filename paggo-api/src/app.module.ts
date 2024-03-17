import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { InvoiceController } from './invoice/invoice.controller';
import { InvoiceService } from './invoice/invoice.service';
import { UserService } from './user/user.service';
import { InvoiceGateway } from './invoice/invoice.gateway';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [AppController, InvoiceController, AuthController],
  providers: [
    AppService,
    PrismaService,
    InvoiceService,
    UserService,
    AuthService,
    InvoiceGateway,
  ],
})
export class AppModule {}
