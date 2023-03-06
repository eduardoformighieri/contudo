import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminRole, Prisma } from '@prisma/client';
import { LoginDto } from './dto/inputs/login.dto';

import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { JwtPayloadDto } from './dto/outputs/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async findOne(
    postWhereUniqueInput: Prisma.AdminWhereUniqueInput,
  ): Promise<Admin & { role: AdminRole }> {
    const admin = await this.prisma.admin.findUnique({
      where: postWhereUniqueInput,
      include: {
        role: true,
      },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async validateAdmin({ email, password }: LoginDto): Promise<JwtPayloadDto> {
    const admin = await this.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return new JwtPayloadDto(admin);
    }
    return null;
  }

  async login({
    id,
    name,
    email,
    role,
  }: JwtPayloadDto): Promise<{ access_token: string }> {
    const payload = { name, email, role, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
