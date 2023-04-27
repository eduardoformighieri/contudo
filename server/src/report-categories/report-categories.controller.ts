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
import { ReportCategory, ReportTag } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportCategoriesService } from './report-categories.service';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Report Categories')
@Controller('report-categories')
export class ReportCategoriesController {
  constructor(
    private readonly reportCategoriesService: ReportCategoriesService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Find all Report Categories' })
  async findAll(): Promise<ReportCategory[]> {
    return await this.reportCategoriesService.findAll();
  }
}
