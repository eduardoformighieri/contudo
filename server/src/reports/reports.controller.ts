import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Request,
  Delete,
  Query,
  Patch,
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
import { OrderDirection } from 'src/common/enums/order-direction.enum';
import { ReportOrderBy } from './enums/report-order-by.enum';
import { AddTagToReportDto } from './dto/inputs/add-tag-to-report.dto';
import { RemoveTagFromReportDto } from './dto/inputs/remove-tag-from-report.dto';
import { ChangeReportStatusDto } from './dto/inputs/change-report-status.dto';
import { ChangeReportPriorityDto } from './dto/inputs/change-report-priority.dto';
import { AssignAdminToReportDto } from './dto/inputs/assign-admin-to-report.dto';
import { UnassigAdminFromReportDto } from './dto/inputs/unassign-admin-to-report.dto';
import { AddEmailToReportDto } from './dto/inputs/add-email-to-report-as-guest.dto';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @ApiOperation({ summary: 'Find all Reports' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'orderBy', enum: ReportOrderBy, required: false })
  @ApiQuery({ name: 'orderDirection', enum: OrderDirection, required: false })
  async getAllReports(
    @Query('orderBy') orderBy?: ReportOrderBy,
    @Query('orderDirection') orderDirection?: OrderDirection,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<Paginated<ReportForAdminDto[]>> {
    return this.reportsService.findAll({
      _page: page,
      limit,
      orderBy,
      orderDirection,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Report by id' })
  async getReportById(@Param('id') id: string): Promise<ReportForAdminDto> {
    return this.reportsService.findById(id);
  }

  @Public()
  @Get('guest/:secretKey')
  @ApiOperation({ summary: 'Find Report by secret report key' })
  async getReportBySecretReportKey(
    @Param('secretKey') secretKey: string,
  ): Promise<ReportForGuestDto> {
    return this.reportsService.findBySecretKey(secretKey);
  }

  @Public()
  @Patch('guest/:id/add-email')
  @ApiOperation({ summary: 'Add email to report by secret report key' })
  async addPostBoxAsGuest(
    @Param('secretKey') secretKey: string,
    @Body() addEmailToReportDto: AddEmailToReportDto,
  ): Promise<ReportForAdminDto> {
    return this.reportsService.attachEmailAsGuestForUpdates(
      secretKey,
      addEmailToReportDto.email,
    );
  }

  @Public()
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
    @Request() req,
    @Body() reportDto: CreateReportAsAdminDto,
  ): Promise<ReportForAdminDto> {
    return this.reportsService.createAsAdmin({
      reportDto,
      adminData: req.user,
    });
  }

  @Patch(':id/add-tag')
  @ApiOperation({ summary: 'Add tag to report' })
  async addTag(
    @Request() req,
    @Param('id') reportId: string,
    @Body() addTagToReportDto: AddTagToReportDto,
  ): Promise<ReportForAdminDto> {
    return this.reportsService.addTag(
      req.user,
      reportId,
      addTagToReportDto.tagName,
    );
  }

  @Patch(':id/remove-tag')
  @ApiOperation({ summary: 'Remove tag from report' })
  async removeTag(
    @Request() req,
    @Param('id') reportId: string,
    @Body() removeTagFromReportDto: RemoveTagFromReportDto,
  ): Promise<ReportForAdminDto> {
    return this.reportsService.removeTag(
      req.user,
      reportId,
      removeTagFromReportDto.tagName,
    );
  }

  @Patch(':id/assign-admin')
  @ApiOperation({ summary: 'Assign admin to report' })
  async assignAdmin(
    @Request() req,
    @Param('id') reportId: string,
    @Body() assignAdminToReportDto: AssignAdminToReportDto,
  ): Promise<ReportForAdminDto> {
    return this.reportsService.assignAdmin(
      req.user,
      reportId,
      assignAdminToReportDto.adminId,
    );
  }

  @Patch(':id/unassig-admin')
  @ApiOperation({ summary: ' Unassig admin from report' })
  async unassigAdmin(
    @Request() req,
    @Param('id') reportId: string,
    @Body() unassigAdminFromReportDto: UnassigAdminFromReportDto,
  ): Promise<ReportForAdminDto> {
    return this.reportsService.unassigAdmin(
      req.user,
      reportId,
      unassigAdminFromReportDto.adminId,
    );
  }

  @Patch(':id/priority')
  async changeReportPriority(
    @Request() req,
    @Param('id') reportId: string,
    @Body() changeReportPriorityDto: ChangeReportPriorityDto,
  ): Promise<ReportForAdminDto> {
    return this.reportsService.changeReportPriority(
      req.user,
      reportId,
      changeReportPriorityDto.priorityId,
    );
  }

  @Patch(':id/status')
  async changeReportStatus(
    @Request() req,
    @Param('id') reportId: string,
    @Body() changeReportStatusDto: ChangeReportStatusDto,
  ): Promise<ReportForAdminDto> {
    return this.reportsService.changeReportStatus(
      req.user,
      reportId,
      changeReportStatusDto.statusId,
    );
  }
}
