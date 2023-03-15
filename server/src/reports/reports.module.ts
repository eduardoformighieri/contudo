import { Module } from '@nestjs/common';
import { EncryptionService } from 'src/common/services/encryption.service';
import { PrismaService } from 'src/prisma.service';
import { ReportActivityLogsService } from 'src/report-activity-logs/report-activity-logs.service';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  controllers: [ReportsController],
  providers: [
    ReportsService,
    PrismaService,
    EncryptionService,
    ReportActivityLogsService,
  ],
})
export class ReportsModule {}
