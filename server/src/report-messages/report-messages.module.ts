import { Module } from '@nestjs/common';
import { EncryptionService } from 'src/common/services/encryption.service';
import { EmailService } from 'src/email/email.service';
import { ReportsService } from 'src/reports/reports.service';

import { ReportMessagesGateway } from './report-messages.gateway';

@Module({
  providers: [ReportMessagesGateway, ReportsService],
  exports: [
    ReportMessagesGateway,
    ReportsService,
    EncryptionService,
    EmailService,
  ],
})
export class ReportMessagessModule {}
