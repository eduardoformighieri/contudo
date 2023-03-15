import { Injectable } from '@nestjs/common';
import { ReportStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReportStatusesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ReportStatus[]> {
    return await this.prisma.reportStatus.findMany();
  }
}
