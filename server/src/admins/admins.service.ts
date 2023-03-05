import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Admin, Prisma } from '@prisma/client';
import { Paginated } from 'src/common/interfaces/paginated.interface';
import { CreateAdminDto } from './dto/inputs/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { UpdateAdminDto } from './dto/inputs/update-admin.dto';
import { AdminWithRoleDto } from './dto/outputs/admin-with-role.dto';

//  orderBy?: Prisma.AdminOrderByWithRelationInput;

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    postWhereUniqueInput: Prisma.AdminWhereUniqueInput,
  ): Promise<AdminWithRoleDto> {
    const admin = await this.prisma.admin.findUnique({
      where: postWhereUniqueInput,
      include: {
        role: true,
      },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return new AdminWithRoleDto(admin);
  }

  async findAll({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }): Promise<Paginated<AdminWithRoleDto[]>> {
    const skip = (page - 1) * limit;
    const take = limit;

    const admins = await this.prisma.admin.findMany({
      skip,
      take,
      include: {
        role: true,
      },
    });

    const adminDtos = admins.map((admin) => new AdminWithRoleDto(admin));

    const total = await this.prisma.admin.count();

    return {
      page,
      count: admins.length,
      total,
      payload: adminDtos,
    };
  }

  async create({
    email,
    name,
    password,
    role,
  }: CreateAdminDto): Promise<AdminWithRoleDto> {
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
          connectOrCreate: {
            where: { name: role },
            create: {
              name: role,
            },
          },
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
    const admin = await this.prisma.admin.update({
      data,
      where,
      include: {
        role: true,
      },
    });
    return new AdminWithRoleDto(admin);
  }

  async updatePassword(params: {
    where: Prisma.AdminWhereUniqueInput;
    data: Prisma.AdminUpdateInput;
  }): Promise<Admin> {
    const { data, where } = params;
    return this.prisma.admin.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.AdminWhereUniqueInput): Promise<Admin> {
    return this.prisma.admin.delete({
      where,
    });
  }
}
