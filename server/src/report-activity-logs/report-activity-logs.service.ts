import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, ReportActivityLog } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateReportActivityLogDto } from './dto/inputs/create-report-activity-log.dto';

@Injectable()
export class ReportActivityLogsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createReportActivityLogDto: CreateReportActivityLogDto,
  ): Promise<ReportActivityLog> {
    const { log, adminId, reportId } = createReportActivityLogDto;
    const activityLog = await this.prisma.reportActivityLog.create({
      data: {
        log,
        admin: { connect: { id: adminId } },
        report: { connect: { id: reportId } },
      },
    });
    return activityLog;
  }
}
