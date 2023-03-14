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
import { ReportTag } from '@prisma/client';
import { ReportTagsService } from './report-tags.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReportTagDto } from './dto/inputs/create-report-tag.dto';
import { UpdateReportTagDto } from './dto/inputs/update-report-tag.dto';

@ApiTags('Report Tags')
@Controller('report-tags')
export class ReportTagsController {
  constructor(private readonly reportTagsService: ReportTagsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Report Tag' })
  async create(
    @Body() createReportTagDto: CreateReportTagDto,
  ): Promise<ReportTag> {
    return await this.reportTagsService.create(createReportTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all Report Tags' })
  async findAll(): Promise<ReportTag[]> {
    return await this.reportTagsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Report Tag by id' })
  async findTag(@Param('id') id: string): Promise<ReportTag> {
    return await this.reportTagsService.findTag({ id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Report Tag by id' })
  async updateTag(
    @Param('id') id: string,
    @Body() updateReportTagDto: UpdateReportTagDto,
  ): Promise<ReportTag> {
    return await this.reportTagsService.updateTag({
      where: { id },
      data: updateReportTagDto,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Report Tag by id' })
  async deleteTag(@Param('id') id: string): Promise<ReportTag> {
    return await this.reportTagsService.deleteTag({ id });
  }
}
