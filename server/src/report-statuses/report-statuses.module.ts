import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReportStatusesController } from './report-statuses.controller';
import { ReportStatusesService } from './report-statuses.service';

@Module({
  controllers: [ReportStatusesController],
  providers: [ReportStatusesService, PrismaService],
})
export class ReportStatusesModule {}
