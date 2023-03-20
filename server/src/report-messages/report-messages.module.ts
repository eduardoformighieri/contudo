import { Module } from '@nestjs/common';
import { ReportsService } from 'src/reports/reports.service';

import { ReportMessagesGateway } from './report-messages.gateway';

@Module({
  providers: [ReportMessagesGateway, ReportsService],
  exports: [ReportMessagesGateway, ReportsService],
})
export class ReportMessagessModule {}
