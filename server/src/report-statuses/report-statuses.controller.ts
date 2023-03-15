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
import { ReportStatus, ReportTag } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportStatusesService } from './report-statuses.service';

@ApiTags('Report Statuses')
@Controller('report-statuses')
export class ReportStatusesController {
  constructor(private readonly reportStatusesService: ReportStatusesService) {}

  @Get()
  @ApiOperation({ summary: 'Find all Report Statuses' })
  async findAll(): Promise<ReportStatus[]> {
    return await this.reportStatusesService.findAll();
  }
}
