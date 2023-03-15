import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeReportStatusDto {
  @ApiProperty({
    example: 'd68e3fd6-1723-4ba9-9014-b13d133dd87e',
  })
  @IsNotEmpty()
  @IsString()
  readonly statusId: string;
}
