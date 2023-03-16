import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportCategory, ReportMessage } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReportMessagesService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(
    sentBy: string,
    reportId: string,
    content: string,
  ): Promise<ReportMessage> {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
      include: { tags: true },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const newMessage = await this.prisma.report.update({
      where: { id: reportId },
      data: {
        messages: {
          create: {
            content,
            sent_by: sentBy,
          },
        },
      },
      select: {
        messages: {
          orderBy: {
            created_at: 'desc',
          },

          take: 1,
        },
      },
    });

    return newMessage[0];
  }
}
