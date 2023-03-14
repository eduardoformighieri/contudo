import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, ReportTag } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateReportTagDto } from './dto/inputs/create-report-tag.dto';
import { UpdateReportTagDto } from './dto/inputs/update-report-tag.dto';

@Injectable()
export class ReportTagsService {
  constructor(private prisma: PrismaService) {}

  async create(createReportTagDto: CreateReportTagDto): Promise<ReportTag> {
    const existingTagName = await this.prisma.reportTag.findUnique({
      where: { name: createReportTagDto.name },
    });
    if (existingTagName) {
      throw new BadRequestException('A Tag with that name already exists');
    }

    const tag = await this.prisma.reportTag.create({
      data: createReportTagDto,
    });
    return tag;
  }

  async findAll(): Promise<ReportTag[]> {
    const tags = await this.prisma.reportTag.findMany();
    return tags;
  }

  async findTag(where: Prisma.ReportTagWhereUniqueInput): Promise<ReportTag> {
    const tag = await this.prisma.reportTag.findUnique({
      where,
    });
    return tag;
  }

  async updateTag(params: {
    where: Prisma.ReportTagWhereUniqueInput;
    data: UpdateReportTagDto;
  }): Promise<ReportTag> {
    const { data, where } = params;

    const existingTagName = await this.prisma.reportTag.findUnique({
      where: { name: data.name },
    });
    if (existingTagName) {
      throw new BadRequestException('A Tag with that name already exists');
    }

    const tag = await this.prisma.reportTag.update({
      where,
      data,
    });
    return tag;
  }

  async deleteTag(where: Prisma.ReportTagWhereUniqueInput): Promise<ReportTag> {
    const tag = await this.prisma.reportTag.delete({
      where,
    });
    return tag;
  }
}
