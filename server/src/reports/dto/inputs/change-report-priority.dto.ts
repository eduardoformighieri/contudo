import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeReportPriorityDto {
  @ApiProperty({
    example: 'd68e3fd6-1723-4ba9-9014-b13d133dd87e',
  })
  @IsNotEmpty()
  @IsString()
  readonly priorityId: string;
}
