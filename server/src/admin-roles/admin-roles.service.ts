import { Injectable } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminRolesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<AdminRole[]> {
    return await this.prisma.adminRole.findMany();
  }
}
