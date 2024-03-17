// invoice.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Be sure to restrict this in production
  },
})
export class InvoiceGateway {
  @WebSocketServer()
  server: Server;

  notifyClientsAboutInvoiceChange(invoiceData: any) {
    this.server.emit('invoiceChanged', invoiceData);
  }
}
