import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ReportCategoriesModule } from './report-categories/report-categories.module';
import { ReportPrioritiesModule } from './report-priorities/report-priorities.module';
import { ReportSourcesModule } from './report-sources/report-sources.module';
import { ReportStatusesModule } from './report-statuses/report-statuses.module';
import { ReportTagsModule } from './report-tags/report-tags.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot(),
    AdminsModule,
    AuthModule,
    ReportsModule,
    ReportTagsModule,
    ReportPrioritiesModule,
    ReportStatusesModule,
    ReportSourcesModule,
    ReportCategoriesModule,
  ],
})
export class AppModule {}
