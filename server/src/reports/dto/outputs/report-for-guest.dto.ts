import { ApiProperty } from '@nestjs/swagger';
import {
  Admin,
  AdminRole,
  Report,
  ReportAttachment,
  ReportCategory,
  ReportMessage,
  ReportStatus,
} from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';

export class ReportForGuestDto {
  @ApiProperty({
    example: 'Marco Antonio',
  })
  @IsNotEmpty()
  @IsString()
  readonly guest_identity: string;

  @ApiProperty({
    example: '6198a728-547c-44b5-998b-c62bec3d0689',
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

  /* eslint-disable */
  @ApiProperty({
    example: ["http//aws/image/2737sj379s', 'http//aws/audio/2737sj379s"],
  })
  /* eslint-enable */
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

  constructor(
    report: Report & {
      category: ReportCategory;
      attachments: ReportAttachment[];
      status: ReportStatus;
      messages: ReportMessage[];
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
    } = report;
    this.guest_identity = guest_identity;
    this.title = title;
    this.description = description;
    this.category = category?.name;
    this.status = status?.name;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.attachments = attachments.map((attachment) => attachment.url);
    this.messages = messages;
  }
}
