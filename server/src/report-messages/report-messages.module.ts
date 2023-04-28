import { Module } from '@nestjs/common';

import { ReportMessagesController } from './report-messages.controller';
import { PrismaService } from 'src/prisma.service';
import { ReportMessagesService } from './report-messages.service';

@Module({
  controllers: [ReportMessagesController],
  providers: [ReportMessagesService, PrismaService],
})
export class ReportMessagesModule {}
