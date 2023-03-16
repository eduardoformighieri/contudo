import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReportForAdminDto } from './dto/outputs/report-for-admin.dto';
import { ReportForGuestDto } from './dto/outputs/report-for-guest.dto';
import * as bcrypt from 'bcryptjs';
import { CreateReportAsAdminDto } from './dto/inputs/create-report-as-admin.dto';
import { CreateReportAsGuestDto } from './dto/inputs/create-report-as-guest.dto';
import { EncryptionService } from 'src/common/services/encryption.service';
import { Paginated } from 'src/common/interfaces/paginated.interface';
import { pagination } from 'src/common/utils/pagination';
import { OrderDirection } from 'src/common/enums/order-direction.enum';
import { ReportOrderBy } from './enums/report-order-by.enum';
import { AdminWithRoleDto } from 'src/admins/dto/outputs/admin-with-role.dto';
import { Prisma, ReportMessage } from '@prisma/client';

//  orderBy?: Prisma.ReportOrderByWithRelationInput;

@Injectable()
export class ReportsService {
  constructor(
    private prisma: PrismaService,
    private encryptionService: EncryptionService,
  ) {}

  async findAll(params: {
    orderBy?: ReportOrderBy;
    orderDirection?: OrderDirection;
    _page?: number;
    limit?: number;
  }): Promise<Paginated<ReportForAdminDto[]>> {
    const { _page, orderBy, orderDirection, limit } = params;
    const { page, take, skip } = pagination(_page, limit);

    let prismaOrderBy = null;

    if (!!orderBy && !!orderDirection) {
      if (orderBy === 'priority_level') {
        prismaOrderBy = {
          priority: {
            priority_level: orderDirection,
          },
        };
      } else {
        prismaOrderBy = { [orderBy]: orderDirection };
      }
    }

    const reports = await this.prisma.report.findMany({
      orderBy: prismaOrderBy || { updated_at: 'desc' },
      skip,
      take,
      include: {
        activity_logs: true,
        assigned_admins: {
          include: {
            role: true,
          },
        },
        attachments: true,
        category: true,
        messages: true,
        priority: true,
        source: true,
        tags: true,
        status: true,
      },
    });

    const reportForAdminDtos = reports.map(
      (report) =>
        new ReportForAdminDto({
          ...report,
          description: this.encryptionService.decrypt(report.description),
        }),
    );

    const total = await this.prisma.report.count();

    return {
      page,
      count: reports.length,
      total,
      payload: reportForAdminDtos,
    };
  }

  async findById(id: string): Promise<ReportForAdminDto> {
    const report = await this.prisma.report.findUnique({
      where: {
        id,
      },
      include: {
        activity_logs: true,
        assigned_admins: {
          include: {
            role: true,
          },
        },
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
    });
  }

  async createAsAdmin(params: {
    reportDto: CreateReportAsAdminDto;
    adminData: AdminWithRoleDto;
  }): Promise<ReportForAdminDto> {
    const { reportDto, adminData } = params;
    const {
      title,
      attachmentUrls,
      categoryId,
      description,
      sourceId,
      statusId,
      reportDate,
    } = reportDto;

    const report = await this.prisma.report.create({
      data: {
        title,
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
        activity_logs: {
          create: {
            log: `${adminData.name} created this report`,
            admin: { connect: { id: adminData.id } },
          },
        },
      },

      include: {
        activity_logs: true,
        assigned_admins: {
          include: {
            role: true,
          },
        },
        attachments: true,
        category: true,
        messages: true,
        priority: true,
        source: true,
        tags: true,
        status: true,
      },
    });

    return new ReportForAdminDto({
      ...report,
      description: this.encryptionService.decrypt(report.description),
    });
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
    });
  }

  async createAsGuest(
    createReportAsGuestDto: CreateReportAsGuestDto,
  ): Promise<{ secretReportKey: string }> {
    const { attachmentUrls, categoryId, description, guest_identity, title } =
      createReportAsGuestDto;

    const secretKey = this.encryptionService.generateRandomSecretKey();

    await this.prisma.report.create({
      data: {
        title,
        description: this.encryptionService.encrypt(description),
        guest_identity,
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
        assigned_admins: {
          include: {
            role: true,
          },
        },
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

  async addTag(
    adminData: AdminWithRoleDto,
    reportId: string,
    tagName: string,
  ): Promise<ReportForAdminDto> {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
      include: { tags: true },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const tag = await this.prisma.reportTag.findUnique({
      where: { name: tagName },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    const tagAlreadyAdded = report.tags.some((tag) => tag.name === tagName);

    if (tagAlreadyAdded) {
      throw new BadRequestException('Tag already added to this report');
    }

    const updatedReport = await this.prisma.report.update({
      where: { id: reportId },
      data: {
        tags: {
          connect: {
            name: tagName,
          },
        },
        activity_logs: {
          create: {
            log: `${adminData.name} added ${tagName} tag to this report`,
            admin: { connect: { id: adminData.id } },
          },
        },
      },
      include: {
        activity_logs: true,
        assigned_admins: {
          include: {
            role: true,
          },
        },
        attachments: true,
        category: true,
        messages: true,
        priority: true,
        source: true,
        tags: true,
        status: true,
      },
    });

    return new ReportForAdminDto({
      ...updatedReport,
      description: this.encryptionService.decrypt(updatedReport.description),
    });
  }

  async removeTag(
    adminData: AdminWithRoleDto,
    reportId: string,
    tagName: string,
  ): Promise<ReportForAdminDto> {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
      include: { tags: true },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const tag = await this.prisma.reportTag.findUnique({
      where: { name: tagName },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    const tagAlreadyAdded = report.tags.some((tag) => tag.name === tagName);

    if (!tagAlreadyAdded) {
      throw new BadRequestException('Tag not added to this report');
    }

    const updatedReport = await this.prisma.report.update({
      where: { id: reportId },
      data: {
        tags: {
          disconnect: {
            name: tagName,
          },
        },
        activity_logs: {
          create: {
            log: `${adminData.name} removed ${tagName} tag from this report`,
            admin: { connect: { id: adminData.id } },
          },
        },
      },
      include: {
        activity_logs: true,
        assigned_admins: {
          include: {
            role: true,
          },
        },
        attachments: true,
        category: true,
        messages: true,
        priority: true,
        source: true,
        tags: true,
        status: true,
      },
    });

    return new ReportForAdminDto({
      ...updatedReport,
      description: this.encryptionService.decrypt(updatedReport.description),
    });
  }

  async assignAdmin(
    adminData: AdminWithRoleDto,
    reportId: string,
    adminId: string,
  ): Promise<ReportForAdminDto> {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
      include: { assigned_admins: true },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const adminAlreadyAdded = report.assigned_admins.some(
      (admin) => admin.id === adminId,
    );

    if (adminAlreadyAdded) {
      throw new BadRequestException('Admin already assigned to this report');
    }

    const updatedReport = await this.prisma.report.update({
      where: { id: reportId },
      data: {
        assigned_admins: {
          connect: {
            id: adminId,
          },
        },
        activity_logs: {
          create: {
            log: `${adminData.name} assigned ${admin.name} to this report`,
            admin: { connect: { id: adminData.id } },
          },
        },
      },
      include: {
        activity_logs: true,
        assigned_admins: {
          include: {
            role: true,
          },
        },
        attachments: true,
        category: true,
        messages: true,
        priority: true,
        source: true,
        tags: true,
        status: true,
      },
    });

    return new ReportForAdminDto({
      ...updatedReport,
      description: this.encryptionService.decrypt(updatedReport.description),
    });
  }

  async unassigAdmin(
    adminData: AdminWithRoleDto,
    reportId: string,
    adminId: string,
  ): Promise<ReportForAdminDto> {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
      include: { assigned_admins: true },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const adminAlreadyAdded = report.assigned_admins.some(
      (admin) => admin.id === adminId,
    );

    if (!adminAlreadyAdded) {
      throw new BadRequestException('Admin not assigned to this report');
    }

    const updatedReport = await this.prisma.report.update({
      where: { id: reportId },
      data: {
        assigned_admins: {
          disconnect: {
            id: adminId,
          },
        },
        activity_logs: {
          create: {
            log: `${adminData.name} unassigned ${admin.name} from this report`,
            admin: { connect: { id: adminData.id } },
          },
        },
      },
      include: {
        activity_logs: true,
        assigned_admins: {
          include: {
            role: true,
          },
        },
        attachments: true,
        category: true,
        messages: true,
        priority: true,
        source: true,
        tags: true,
        status: true,
      },
    });

    return new ReportForAdminDto({
      ...updatedReport,
      description: this.encryptionService.decrypt(updatedReport.description),
    });
  }

  async changeReportPriority(
    adminData: AdminWithRoleDto,
    reportId: string,
    priorityId?: string,
  ): Promise<ReportForAdminDto> {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
      include: { priority: true },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const priority = priorityId
      ? await this.prisma.reportPriority.findUnique({
          where: { id: priorityId },
        })
      : null;

    const updatedReport = await this.prisma.report.update({
      where: { id: reportId },
      data: {
        priority: priority
          ? { connect: { id: priorityId } }
          : { disconnect: true },
        activity_logs: {
          create: {
            log: `${adminData.name} ${
              priority
                ? `changed priority to ${priority.name} on`
                : 'removed priority from'
            } this report`,
            admin: { connect: { id: adminData.id } },
          },
        },
      },
      include: {
        activity_logs: true,
        assigned_admins: {
          include: {
            role: true,
          },
        },
        attachments: true,
        category: true,
        messages: true,
        priority: true,
        source: true,
        tags: true,
        status: true,
      },
    });

    return new ReportForAdminDto({
      ...updatedReport,
      description: this.encryptionService.decrypt(updatedReport.description),
    });
  }

  async changeReportStatus(
    adminData: AdminWithRoleDto,
    reportId: string,
    statusId: string,
  ): Promise<ReportForAdminDto> {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
      include: { status: true },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const status = await this.prisma.reportStatus.findUnique({
      where: { id: statusId },
    });

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    const updatedReport = await this.prisma.report.update({
      where: { id: reportId },
      data: {
        status: { connect: { id: statusId } },
        activity_logs: {
          create: {
            log: `${adminData.name} changed status to ${status.name} on this report`,
            admin: { connect: { id: adminData.id } },
          },
        },
      },
      include: {
        activity_logs: true,
        assigned_admins: {
          include: {
            role: true,
          },
        },
        attachments: true,
        category: true,
        messages: true,
        priority: true,
        source: true,
        tags: true,
        status: true,
      },
    });

    return new ReportForAdminDto({
      ...updatedReport,
      description: this.encryptionService.decrypt(updatedReport.description),
    });
  }
}
