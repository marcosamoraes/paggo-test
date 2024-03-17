import { Injectable, NotFoundException } from '@nestjs/common';
import { Invoice, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { InvoiceProcessedDto } from 'src/dtos/InvoiceProcessedDto';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from 'src/s3.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InvoiceService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async find(
    invoiceWhereUniqueInput: Prisma.InvoiceWhereUniqueInput,
  ): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique({
      where: invoiceWhereUniqueInput,
    });
  }

  async findFirst(params: {
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput;
  }): Promise<Invoice | null> {
    const { where, orderBy } = params;
    return this.prisma.invoice.findFirst({
      where,
      orderBy,
    });
  }

  async get(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InvoiceWhereUniqueInput;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput;
  }): Promise<Invoice[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.invoice.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.InvoiceCreateInput): Promise<Invoice> {
    return this.prisma.invoice.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.InvoiceWhereUniqueInput;
    data: Prisma.InvoiceUpdateInput;
  }): Promise<Invoice> {
    const { where, data } = params;
    return this.prisma.invoice.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.InvoiceWhereUniqueInput): Promise<Invoice> {
    return this.prisma.invoice.delete({
      where,
    });
  }

  async upload(file: Express.Multer.File) {
    const S3ServiceInstance = new S3Service();

    try {
      const extension = file.originalname.split('.').pop();
      const name = randomUUID() + '.' + extension;

      await S3ServiceInstance.uploadFileToS3(file.buffer, name);

      let user = await this.userService.find({ email: 'teste@teste.com' });

      if (!user) {
        user = await this.userService.create({
          email: 'teste@teste.com',
          name: 'Teste',
          password: '123456',
        });
      }

      await this.create({
        fileName: name,
        user: {
          connect: {
            id: user.id,
          },
        },
      });

      return {
        message: 'File uploaded successfully',
      };
    } catch (error) {
      throw new Error(`Error uploading file: ${error}`);
    }
  }

  async updateResults(data: InvoiceProcessedDto) {
    const { file, ...invoiceData } = data;

    const invoice = await this.findFirst({
      where: { fileName: file },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    const updateData = {
      ...invoiceData,
      processedAt: new Date(),
    };

    await this.update({
      where: { id: invoice.id },
      data: updateData,
    });

    return {
      message: 'Invoice processed successfully',
      invoice,
      data,
    };
  }
}
