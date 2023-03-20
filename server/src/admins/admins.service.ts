import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

//  orderBy?: Prisma.AdminOrderByWithRelationInput;

@Injectable()
export class AdminsService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

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
    const { email, name, roleId } = createAdminDto;

    const [highestPowerAdminRole] = await this.prisma.adminRole.findMany({
      orderBy: {
        power_level: 'desc',
      },
      take: 1,
    });

    if (highestPowerAdminRole.id === roleId) {
      throw new UnauthorizedException();
    }

    const emailAlreadyInUse = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (emailAlreadyInUse) {
      throw new BadRequestException('Email already in use');
    }

    const role = await this.prisma.adminRole.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      throw new NotFoundException('Role  not found');
    }

    const admin = await this.prisma.admin.create({
      data: {
        email,
        name,
        role: {
          connect: { id: role.id },
        },
      },
      include: {
        role: true,
      },
    });

    const token = await this.jwtService.sign(
      {
        sub: admin.id,
      },
      { secret: process.env.JWT_SECRET },
    );

    await this.emailService.sendFirstAccess(email, token);

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

  async delete(
    where: Prisma.AdminWhereUniqueInput,
  ): Promise<{ message: string }> {
    await this.prisma.admin.delete({
      where,
      include: {
        role: true,
      },
    });
    return { message: 'You defined your password successfully' };
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

  async transferSuperAdminRole(
    currentSuperAdminId: string,
    promotedAdminId: string,
  ): Promise<any> {
    const [highestPowerAdminRole, secondHighestPowerAdminRole] =
      await this.prisma.adminRole.findMany({
        orderBy: {
          power_level: 'desc',
        },
        take: 2,
      });

    const result = await this.prisma.$transaction([
      this.prisma.admin.update({
        data: {
          role: { connect: { id: secondHighestPowerAdminRole.id } },
        },
        where: {
          id: currentSuperAdminId,
        },
        include: {
          role: true,
        },
      }),
      this.prisma.admin.update({
        data: {
          role: { connect: { id: highestPowerAdminRole.id } },
        },
        where: {
          id: promotedAdminId,
        },
        include: {
          role: true,
        },
      }),
    ]);

    return result;
  }
}
