import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UpdatePasswordDto {
  @IsString()
  @ApiProperty({ example: '123456789' })
  readonly oldPassword: string;

  @IsString()
  @ApiProperty({ example: '987654321' })
  readonly newPassword: string;
}
