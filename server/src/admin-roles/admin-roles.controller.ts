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
import { AdminRole, ReportTag } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminRolesService } from './admin-roles.service';

@ApiTags('Admin Roles')
@Controller('admin-roles')
export class AdminRolesController {
  constructor(private readonly adminCategoriesService: AdminRolesService) {}

  @Get()
  @ApiOperation({ summary: 'Find all Admin Roles' })
  async findAll(): Promise<AdminRole[]> {
    return await this.adminCategoriesService.findAll();
  }
}
