import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReportTagsController } from './report-tags.controller';
import { ReportTagsService } from './report-tags.service';

@Module({
  controllers: [ReportTagsController],
  providers: [ReportTagsService, PrismaService],
})
export class ReportTagsModule {}
