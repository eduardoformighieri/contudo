import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReportSourcesController } from './report-sources.controller';
import { ReportSourcesService } from './report-sources.service';

@Module({
  controllers: [ReportSourcesController],
  providers: [ReportSourcesService, PrismaService],
})
export class ReportSourcesModule {}
