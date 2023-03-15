import { ApiProperty } from '@nestjs/swagger';
import {
  Admin,
  AdminRole,
  Report,
  ReportActivityLog,
  ReportAttachment,
  ReportCategory,
  ReportMessage,
  ReportPriority,
  ReportSource,
  ReportStatus,
  ReportTag,
} from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';
import { ReportActivityLogDto } from 'src/report-activity-logs/dto/outputs/report-activity-log.dto';

export class ReportForAdminDto {
  @ApiProperty({
    example: 'd68e3fd6-1723-4ba9-9014-b13d133dd87e',
  })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @ApiProperty({
    example: 'Marco Antonio',
  })
  @IsNotEmpty()
  @IsString()
  readonly guest_identity: string;

  @ApiProperty({
    example: '982378937',
  })
  @IsNotEmpty()
  @IsString()
  readonly reportDate: Date;

  @ApiProperty({
    example: 'Sexual Harassment',
  })
  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @ApiProperty({
    example: 'Stephen behavior',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'I saw Stephen doing some weird...',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  // prettier-ignore
  @ApiProperty({
    example: ["http//aws/image/2737sj379s", "http//aws/audio/2737sj379s"],
  })
// prettier-ignore
  @IsOptional()
  @ArrayMinSize(1)
  @IsString({ each: true })
  readonly attachments: string[];

  @ApiProperty({
    example:
      "['{ id: number; sent_by: string; content: string; report_id: string; created_at: Date; updated_at: Date; }', '{ id: number; sent_by: string; content: string; report_id: string; created_at: Date; updated_at: Date; }']",
  })
  readonly messages: ReportMessage[];

  @ApiProperty({
    example:
      "['{ id: number; sent_by: string; content: string; report_id: string; created_at: Date; updated_at: Date; }', '{ id: number; sent_by: string; content: string; report_id: string; created_at: Date; updated_at: Date; }']",
  })
  readonly activity_logs: ReportActivityLogDto[];

  @ApiProperty({
    example:
      "['{ id: number; sent_by: string; content: string; report_id: string; created_at: Date; updated_at: Date; }', '{ id: number; sent_by: string; content: string; report_id: string; created_at: Date; updated_at: Date; }']",
  })
  readonly tags: ReportTag[];

  @ApiProperty({
    example:
      "['{ id: number; sent_by: string; content: string; report_id: string; created_at: Date; updated_at: Date; }', '{ id: number; sent_by: string; content: string; report_id: string; created_at: Date; updated_at: Date; }']",
  })
  readonly assigned_admins: Admin[];

  @ApiProperty({
    example: 'Phone',
  })
  @IsNotEmpty()
  @IsString()
  readonly source: string;

  @ApiProperty({
    example: 'Urgent',
  })
  @IsNotEmpty()
  @IsString()
  readonly priority: string;

  @ApiProperty({
    example: 'Closed',
  })
  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @ApiProperty({
    example: '2016-09-18T17:34:02.666Z',
  })
  @IsNotEmpty()
  @IsDate()
  readonly updated_at: Date;

  @ApiProperty({
    example: '2016-09-18T17:34:02.666Z',
  })
  @IsNotEmpty()
  @IsDate()
  readonly created_at: Date;

  @ApiProperty({
    example: '2016-09-18T17:34:02.666Z',
  })
  @IsNotEmpty()
  @IsDate()
  @IsOptional()
  readonly due_date: Date;

  constructor(
    report: Report & {
      category: ReportCategory;
      attachments: ReportAttachment[];
      status: ReportStatus;
      messages: ReportMessage[];
      priority: ReportPriority;
      source: ReportSource;
      tags: ReportTag[];
      activity_logs: ReportActivityLog[];
      assigned_admins: Admin[];
    },
  ) {
    const {
      title,
      attachments,
      messages,
      category,
      status,
      updated_at,
      created_at,
      description,
      guest_identity,
      activity_logs,
      assigned_admins,
      due_date,
      tags,
      id,
      priority,
      source,
    } = report;
    this.id = id;
    this.category = category?.name;
    this.source = source?.name;
    this.status = status?.name;
    this.title = title;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.attachments = attachments.map((attachment) => attachment.url);
    this.due_date = due_date;
    this.tags = tags;
    this.priority = priority?.name || null;
    this.guest_identity = guest_identity;
    this.assigned_admins = assigned_admins;
    this.messages = messages;
    this.activity_logs = activity_logs.map(
      (activity_log) => new ReportActivityLogDto(activity_log),
    );
  }
}
