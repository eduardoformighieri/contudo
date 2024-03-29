import { Module } from '@nestjs/common';
import { EncryptionService } from 'src/common/services/encryption.service';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, PrismaService, EncryptionService, EmailService],
})
export class ReportsModule {}
