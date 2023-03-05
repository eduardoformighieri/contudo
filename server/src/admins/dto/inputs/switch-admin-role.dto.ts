import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class switchAdminRoleDto {
  @ApiProperty({
    example: 'elder',
  })
  @IsNotEmpty()
  @IsString()
  readonly newRole: string;
}
