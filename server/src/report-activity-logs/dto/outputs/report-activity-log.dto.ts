import { ApiProperty } from '@nestjs/swagger';
import { ReportActivityLog } from '@prisma/client';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ReportActivityLogDto {
  @ApiProperty({
    example: 'Marco Antonio created this report',
  })
  @IsNotEmpty()
  @IsString()
  readonly log: string;

  @ApiProperty({
    example: '2016-09-18T17:34:02.666Z',
  })
  @IsNotEmpty()
  @IsDate()
  readonly created_at: Date;

  constructor(activity_log: ReportActivityLog) {
    const { created_at, log } = activity_log;
    this.log = log;
    this.created_at = created_at;
  }
}
