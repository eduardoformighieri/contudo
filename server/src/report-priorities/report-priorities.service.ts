import { Injectable } from '@nestjs/common';
import { ReportPriority } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReportPrioritiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ReportPriority[]> {
    return await this.prisma.reportPriority.findMany();
  }
}
