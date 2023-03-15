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
import { ReportPriority, ReportTag } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportPrioritiesService } from './report-priorities.service';

@ApiTags('Report Priorities')
@Controller('report-priorities')
export class ReportPrioritiesController {
  constructor(
    private readonly reportPrioritiesService: ReportPrioritiesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Report Tag' })
  @Get()
  @ApiOperation({ summary: 'Find all Report Priorities' })
  async findAll(): Promise<ReportPriority[]> {
    return await this.reportPrioritiesService.findAll();
  }
}
