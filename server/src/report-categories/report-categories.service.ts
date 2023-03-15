import { Injectable } from '@nestjs/common';
import { ReportCategory } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReportCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ReportCategory[]> {
    return await this.prisma.reportCategory.findMany();
  }
}
