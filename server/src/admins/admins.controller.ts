import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { AdminsService } from './admins.service';

import { Admin, Prisma } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Paginated } from 'src/common/interfaces/paginated.interface';
import { CreateAdminDto } from './dto/inputs/create-admin.dto';
import { UpdateAdminDto } from './dto/inputs/update-admin.dto';
import { AdminWithRoleDto } from './dto/outputs/admin-with-role.dto';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find Admin by Id' })
  async getAdminById(@Param('id') id: string): Promise<AdminWithRoleDto> {
    return this.adminsService.findOne({ id });
  }

  @Get()
  @ApiOperation({ summary: 'List all Admins' })
  async getAllAdmins(): Promise<Paginated<AdminWithRoleDto[]>> {
    return this.adminsService.findAll({});
  }

  @Post()
  @ApiOperation({ summary: 'Create Admin' })
  async createAdmin(
    @Body() adminData: CreateAdminDto,
  ): Promise<AdminWithRoleDto> {
    return this.adminsService.create(adminData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Admin' })
  async publishPost(
    @Param('id') id: string,
    @Body() adminData: UpdateAdminDto,
  ): Promise<AdminWithRoleDto> {
    return this.adminsService.update({
      where: { id },
      data: adminData,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Admin' })
  async deletePost(@Param('id') id: string): Promise<Admin> {
    return this.adminsService.delete({ id });
  }
}
