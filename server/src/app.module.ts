import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ReportActivityLogsModule } from './report-activity-logs/report-activity-logs.module';
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
    ReportActivityLogsModule,
  ],
})
export class AppModule {}
