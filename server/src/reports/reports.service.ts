import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReportForAdminDto } from './dto/outputs/report-for-admin.dto';
import { ReportForGuestDto } from './dto/outputs/report-for-guest.dto';
import * as bcrypt from 'bcryptjs';
import { CreateReportAsAdminDto } from './dto/inputs/create-report-as-admin.dto';
import { CreateReportAsGuestDto } from './dto/inputs/create-report-as-guest.dto';
import { EncryptionService } from 'src/common/services/encryption.service';
import { Paginated } from 'src/common/interfaces/paginated.interface';

//  orderBy?: Prisma.ReportOrderByWithRelationInput;

@Injectable()
export class ReportsService {
  constructor(
    private prisma: PrismaService,
    private encryptionService: EncryptionService,
  ) {}

  async findAll(params: {
    page?: number;
    limit?: number;
  }): Promise<Paginated<ReportForAdminDto[]>> {
    let { page, limit } = params;

    page = page ? page : 1;
    const take = limit ? limit : 10;
    const skip = page ? (page - 1) * take : 0;

    const reports = await this.prisma.report.findMany({
      skip,
      take,
      include: {
        activity_logs: true,
        assigned_admins: true,
        attachments: true,
        category: true,
        messages: true,
        priority: true,
        source: true,
        tags: true,
        status: true,
      },
    });

    const reportWithRoleDtos = reports.map(
      (report) =>
        new ReportForAdminDto({
          ...report,
          description: this.encryptionService.decrypt(report.description),
          guest_identity: !!report.guest_identity
            ? this.encryptionService.decrypt(report.guest_identity)
            : null,
        }),
    );

    const total = await this.prisma.report.count();

    return {
      page,
      count: reports.length,
      total,
      payload: reportWithRoleDtos,
    };
  }

  async findById(id: string): Promise<ReportForAdminDto> {
    const report = await this.prisma.report.findUnique({
      where: {
        id,
      },
      include: {
        activity_logs: true,
        assigned_admins: true,
        attachments: true,
        category: true,
        messages: true,
        priority: true,
        source: true,
        tags: true,
        status: true,
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return new ReportForAdminDto({
      ...report,
      description: this.encryptionService.decrypt(report.description),
      guest_identity: !!report.guest_identity
        ? this.encryptionService.decrypt(report.guest_identity)
        : null,
    });
  }

  async createAsAdmin(
    createReportAsAdminDto: CreateReportAsAdminDto,
  ): Promise<ReportForAdminDto> {
    const {
      attachmentUrls,
      categoryId,
      description,
      sourceId,
      statusId,
      reportDate,
    } = createReportAsAdminDto;

    const report = await this.prisma.report.create({
      data: {
        description: this.encryptionService.encrypt(description),
        created_at: reportDate,
        category: { connect: { id: categoryId } },
        source: { connect: { id: sourceId } },
        status: { connect: { id: statusId } },
        attachments: {
          create: attachmentUrls?.map((url) => ({
            url,
          })),
        },
      },

      include: {
        activity_logs: true,
        assigned_admins: true,
        attachments: true,
        category: true,
        messages: true,
        priority: true,
        source: true,
        tags: true,
        status: true,
      },
    });

    return new ReportForAdminDto(report);
  }

  async findBySecretKey(secretKey: string): Promise<ReportForGuestDto> {
    const report = await this.prisma.report.findUnique({
      where: {
        secret_key: secretKey,
      },
      include: {
        attachments: true,
        category: true,
        messages: true,
        status: true,
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return new ReportForGuestDto({
      ...report,
      description: this.encryptionService.decrypt(report.description),
      guest_identity: this.encryptionService.decrypt(report.guest_identity),
    });
  }

  async createAsGuest(
    createReportAsGuestDto: CreateReportAsGuestDto,
  ): Promise<{ secretReportKey: string }> {
    const { attachmentUrls, categoryId, description, guest_identity } =
      createReportAsGuestDto;

    const secretKey = this.encryptionService.generateRandomSecretKey();

    await this.prisma.report.create({
      data: {
        description: this.encryptionService.encrypt(description),
        guest_identity: this.encryptionService.encrypt(guest_identity),
        secret_key: secretKey,
        category: { connect: { id: categoryId } },
        source: {
          connectOrCreate: {
            where: { name: 'Reporting system' },
            create: {
              name: 'Reporting system',
            },
          },
        },
        status: {
          connectOrCreate: {
            where: { name: 'Open' },
            create: {
              name: 'Open',
            },
          },
        },
        attachments: {
          create: attachmentUrls?.map((url) => ({
            url,
          })),
        },
      },

      include: {
        activity_logs: true,
        assigned_admins: true,
        attachments: true,
        category: true,
        messages: true,
        priority: true,
        source: true,
        tags: true,
        status: true,
      },
    });

    return { secretReportKey: secretKey };
  }
}
