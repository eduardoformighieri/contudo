import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminRole, Prisma } from '@prisma/client';
import { LoginDto } from './dto/inputs/login.dto';

import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { UpdatePasswordDto } from './dto/inputs/update-password.dto';
import { AdminWithRoleDto } from 'src/admins/dto/outputs/admin-with-role.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async findMe(id: string): Promise<AdminWithRoleDto> {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return new AdminWithRoleDto(admin);
  }

  async generateJwt({
    id,
  }: AdminWithRoleDto): Promise<{ access_token: string }> {
    const payload: JwtPayload = { sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(adminId: string, password: string): Promise<any> {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    if (!admin.isFirstAccess) {
      throw new ConflictException('First access already done');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await this.prisma.admin.update({
      where: { id: adminId },
      data: {
        password: hashPassword,
        isFirstAccess: false,
      },
    });

    return { message: 'Successfull Sign up' };
  }

  async updatePassword(params: {
    where: Prisma.AdminWhereUniqueInput;
    data: UpdatePasswordDto;
  }): Promise<void> {
    const { data, where } = params;
    const { oldPassword, newPassword } = data;
    const admin = await this.prisma.admin.findUnique({
      where,
    });
    const passwordsMatch = await bcrypt.compare(oldPassword, admin.password);

    if (!passwordsMatch) throw new UnauthorizedException('Invalid credentials');

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await this.prisma.admin.update({
      data: { password: newPasswordHash },
      where,
    });
  }
}
