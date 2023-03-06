import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { JwtService } from '@nestjs/jwt';
import { ValidateAdminDto } from './dto/validate-admin.dto';
import { Admin, Prisma } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async findOne(
    postWhereUniqueInput: Prisma.AdminWhereUniqueInput,
  ): Promise<Admin> {
    const admin = await this.prisma.admin.findUnique({
      where: postWhereUniqueInput,
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async validateAdmin({ email, password }: ValidateAdminDto): Promise<any> {
    const admin = await this.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }

  async login(admin: Admin): Promise<{ access_token: string }> {
    const payload = { email: admin.email, sub: admin.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
