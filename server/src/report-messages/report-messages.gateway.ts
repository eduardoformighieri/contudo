import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ReportMessage } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { ReportsService } from 'src/reports/reports.service';
import { ReportMessagesService } from './report-messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ReportMessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private reportMessagesService: ReportMessagesService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    // Handle a new client connection
  }

  async handleDisconnect(client: Socket) {
    // Handle a client disconnection
  }

  @SubscribeMessage('reportRoomConnection')
  async handleChatRoomConnection(
    @MessageBody() reportId: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    client.join(reportId);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, message: ReportMessage): Promise<void> {
    const newMessage = await this.reportMessagesService.sendMessage(
      message.sent_by,
      message.report_id,
      message.content,
    );
    this.server.to(message.report_id).emit('newMessage', newMessage);
  }
}
