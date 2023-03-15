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
import { ReportSource, ReportTag } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportSourcesService } from './report-sources.service';

@ApiTags('Report Sources')
@Controller('report-sources')
export class ReportSourcesController {
  constructor(private readonly reportSourcesService: ReportSourcesService) {}

  @Get()
  @ApiOperation({ summary: 'Find all Report Sources' })
  async findAll(): Promise<ReportSource[]> {
    return await this.reportSourcesService.findAll();
  }
}
