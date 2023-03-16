import { ApiProperty } from '@nestjs/swagger';
import { AdminRole, ReportActivityLog } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AdminRoleDto {
  @ApiProperty({
    example: 'Leader',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  readonly power_level: number;

  constructor(role: AdminRole) {
    const { name, power_level } = role;
    this.name = name;
    this.power_level = power_level;
  }
}
