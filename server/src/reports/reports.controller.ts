import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ReportsService } from './reports.service';

import { Admin, Prisma } from '@prisma/client';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Paginated } from 'src/common/interfaces/paginated.interface';
import { Public } from 'src/common/decorators/public.decorator';
import { ReportForGuestDto } from './dto/outputs/report-for-guest.dto';
import { ReportForAdminDto } from './dto/outputs/report-for-admin.dto';
import { CreateReportAsAdminDto } from './dto/inputs/create-report-as-admin.dto';
import { CreateReportAsGuestDto } from './dto/inputs/create-report-as-guest.dto';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @ApiOperation({ summary: 'Find all Reports' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getAllReports(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<Paginated<ReportForAdminDto[]>> {
    return this.reportsService.findAll({ page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Report by id' })
  async getReportById(@Param('id') id: string): Promise<ReportForAdminDto> {
    return this.reportsService.findById(id);
  }

  @Get('guest/:secretKey')
  @Public()
  @ApiOperation({ summary: 'Find Report by secret report key' })
  async getReportBySecretReportKey(
    @Param('secretKey') secretKey: string,
  ): Promise<ReportForGuestDto> {
    return this.reportsService.findBySecretKey(secretKey);
  }

  @Post('guest')
  @ApiOperation({ summary: 'Create Report as guest' })
  async createAsGuest(
    @Body() createReportAsGuestDto: CreateReportAsGuestDto,
  ): Promise<{ secretReportKey: string }> {
    return this.reportsService.createAsGuest(createReportAsGuestDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create Report as Admin' })
  async createAsAdmin(
    @Body() createReportAsAdminDto: CreateReportAsAdminDto,
  ): Promise<ReportForAdminDto> {
    return this.reportsService.createAsAdmin(createReportAsAdminDto);
  }
}
