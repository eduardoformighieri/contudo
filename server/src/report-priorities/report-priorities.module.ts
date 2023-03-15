import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReportPrioritiesController } from './report-priorities.controller';
import { ReportPrioritiesService } from './report-priorities.service';

@Module({
  controllers: [ReportPrioritiesController],
  providers: [ReportPrioritiesService, PrismaService],
})
export class ReportPrioritiesModule {}
