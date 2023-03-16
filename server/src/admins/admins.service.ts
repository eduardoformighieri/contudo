import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Admin, Prisma } from '@prisma/client';
import { Paginated } from 'src/common/interfaces/paginated.interface';
import { CreateAdminDto } from './dto/inputs/create-admin.dto';
import { UpdateAdminDto } from './dto/inputs/update-admin.dto';
import { AdminWithRoleDto } from './dto/outputs/admin-with-role.dto';
import * as bcrypt from 'bcryptjs';
import { EncryptionService } from 'src/common/services/encryption.service';
import { pagination } from 'src/common/utils/pagination';

//  orderBy?: Prisma.AdminOrderByWithRelationInput;

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: { id: string }): Promise<AdminWithRoleDto> {
    const admin = await this.prisma.admin.findUnique({
      where,
      include: {
        role: true,
      },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return new AdminWithRoleDto(admin);
  }

  async findAll(params: {
    _page?: number;
    limit?: number;
  }): Promise<Paginated<AdminWithRoleDto[]>> {
    let { _page, limit } = params;

    const { page, take, skip } = pagination(_page, limit);

    const admins = await this.prisma.admin.findMany({
      skip,
      take,
      include: {
        role: true,
      },
    });

    const adminWithRoleDtos = admins.map(
      (admin) => new AdminWithRoleDto(admin),
    );

    const total = await this.prisma.admin.count();

    return {
      page,
      count: admins.length,
      total,
      payload: adminWithRoleDtos,
    };
  }

  async create(createAdminDto: CreateAdminDto): Promise<AdminWithRoleDto> {
    const { email, name, password, role } = createAdminDto;

    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email },
    });
    if (existingAdmin) {
      throw new BadRequestException('Email already in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const admin = await this.prisma.admin.create({
      data: {
        email,
        name,
        password: hashPassword,
        role: {
          connect: { name: role },
        },
      },
      include: {
        role: true,
      },
    });

    return new AdminWithRoleDto(admin);
  }

  async update(params: {
    where: Prisma.AdminWhereUniqueInput;
    data: UpdateAdminDto;
  }): Promise<AdminWithRoleDto> {
    const { data, where } = params;

    if (!!data.email) {
      const existingAdmin = await this.prisma.admin.findUnique({
        where: { email: data.email },
      });
      if (existingAdmin) {
        throw new BadRequestException('Email already in use');
      }
    }

    const admin = await this.prisma.admin.update({
      data,
      where,
      include: {
        role: true,
      },
    });
    return new AdminWithRoleDto(admin);
  }

  async delete(where: Prisma.AdminWhereUniqueInput): Promise<AdminWithRoleDto> {
    const admin = await this.prisma.admin.delete({
      where,
      include: {
        role: true,
      },
    });
    return new AdminWithRoleDto(admin);
  }

  async switchAdminRole(
    adminId: string,
    newRoleId: string,
  ): Promise<AdminWithRoleDto> {
    const role = await this.prisma.adminRole.findUnique({
      where: { id: newRoleId },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const admin = await this.prisma.admin.update({
      data: {
        role: { connect: { id: newRoleId } },
      },
      where: {
        id: adminId,
      },
      include: {
        role: true,
      },
    });
    return new AdminWithRoleDto(admin);
  }
}
