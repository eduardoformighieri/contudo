import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReportActivityLogsController } from './report-activity-logs.controller';
import { ReportActivityLogsService } from './report-activity-logs.service';

@Module({
  controllers: [ReportActivityLogsController],
  providers: [ReportActivityLogsService, PrismaService],
})
export class ReportActivityLogsModule {}
