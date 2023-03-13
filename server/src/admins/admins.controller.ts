import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';

import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Paginated } from 'src/common/interfaces/paginated.interface';
import { CreateAdminDto } from './dto/inputs/create-admin.dto';
import { UpdateAdminDto } from './dto/inputs/update-admin.dto';
import { AdminWithRoleDto } from './dto/outputs/admin-with-role.dto';
import { HierarchyGuard } from './roles/hierarchy.guard';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/roles.enum';
import { RolesGuard } from './roles/roles.guard';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('admin/:id')
  @ApiOperation({ summary: 'Find Admin by Id' })
  @UseGuards(RolesGuard)
  @Roles(Role.Leader, Role.Coleader)
  async getAdminById(@Param('id') id: string): Promise<AdminWithRoleDto> {
    return this.adminsService.findOne({ id });
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'List all Admins' })
  @UseGuards(RolesGuard)
  @Roles(Role.Leader, Role.Coleader)
  async getAllAdmins(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<Paginated<AdminWithRoleDto[]>> {
    return this.adminsService.findAll({ page, limit });
  }

  @Post()
  @ApiOperation({ summary: 'Create Admin' })
  @UseGuards(RolesGuard)
  @Roles(Role.Leader, Role.Coleader)
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto,
  ): Promise<AdminWithRoleDto> {
    return this.adminsService.create(createAdminDto);
  }

  @Patch('/admin/:id')
  @ApiOperation({ summary: 'Update other Admin' })
  @UseGuards(HierarchyGuard, RolesGuard)
  @Roles(Role.Leader, Role.Coleader)
  async updateOtherAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<AdminWithRoleDto> {
    return this.adminsService.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  @Patch('/me')
  @ApiOperation({ summary: 'Update self Admin data' })
  async updateSelfAdmin(
    @Request() req: { user: AdminWithRoleDto },
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<AdminWithRoleDto> {
    return this.adminsService.update({
      where: { id: req.user.id },
      data: updateAdminDto,
    });
  }

  @Delete('admin/:id')
  @UseGuards(HierarchyGuard, RolesGuard)
  @Roles(Role.Leader, Role.Coleader)
  @ApiOperation({ summary: 'Delete Admin' })
  async deletePost(@Param('id') id: string) {
    this.adminsService.delete({ id });
    return { message: 'Admin deleted successfully' };
  }
}
