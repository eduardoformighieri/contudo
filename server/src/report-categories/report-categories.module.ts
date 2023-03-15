import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReportCategoriesController } from './report-categories.controller';
import { ReportCategoriesService } from './report-categories.service';

@Module({
  controllers: [ReportCategoriesController],
  providers: [ReportCategoriesService, PrismaService],
})
export class ReportCategoriesModule {}
