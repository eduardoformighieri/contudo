import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTagToReportDto {
  @ApiProperty({
    example: 'Crime',
  })
  @IsNotEmpty()
  @IsString()
  readonly tagName: string;
}
