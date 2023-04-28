import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ReportMessage } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportMessagesService } from './report-messages.service';
import { SendMessageDto } from './dto/send-message.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Report Messages')
@Controller('report-messages')
export class ReportMessagesController {
  constructor(private readonly reportMessagesService: ReportMessagesService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Send message' })
  async sendMessage(
    @Body()
    { sentBy, reportId, content }: SendMessageDto,
  ): Promise<ReportMessage> {
    return await this.reportMessagesService.sendMessage(
      sentBy,
      reportId,
      content,
    );
  }
}
