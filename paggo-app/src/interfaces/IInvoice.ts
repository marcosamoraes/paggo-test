interface IInvoice {
  id: string;
  userId: string;
  fileName: string;
  invoiceNumber?: string;
  invoiceDate?: Date;
  dueDate?: Date;
  balanceDue?: number;
  metadata?: string;
  processedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}