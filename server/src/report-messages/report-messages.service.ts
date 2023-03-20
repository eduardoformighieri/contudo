import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportCategory, ReportMessage } from '@prisma/client';
import { EncryptionService } from 'src/common/services/encryption.service';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReportMessagesService {
  constructor(
    private prisma: PrismaService,
    private encryptionService: EncryptionService,
    private readonly emailService: EmailService,
  ) {}

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

    if (!!report.guest_email_for_post_box) {
      await this.emailService.sendGuestReportUpdate(
        this.encryptionService.decrypt(report.guest_email_for_post_box),
        'An admin sent you a message',
      );
    }

    return newMessage[0];
  }
}
