import { Injectable } from '@nestjs/common';
import { ReportSource } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReportSourcesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ReportSource[]> {
    return await this.prisma.reportSource.findMany();
  }
}
