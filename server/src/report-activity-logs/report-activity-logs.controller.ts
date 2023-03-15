import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ReportActivityLog } from '@prisma/client';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportActivityLogsService } from './report-activity-logs.service';
import { CreateReportActivityLogDto } from './dto/inputs/create-report-activity-log.dto';

@ApiTags('Report ActivityLogs')
@Controller('report-activity-logs')
export class ReportActivityLogsController {
  constructor(
    private readonly reportActivityLogsService: ReportActivityLogsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Report ActivityLog' })
  async create(
    @Body() createReportActivityLogDto: CreateReportActivityLogDto,
  ): Promise<ReportActivityLog> {
    return await this.reportActivityLogsService.create(
      createReportActivityLogDto,
    );
  }
}
