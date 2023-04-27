import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Admin, AdminRole, Prisma } from '@prisma/client';
import { AdminRoleDto } from 'src/admins/roles/admin-role.dto';

export class AdminWithRoleDto {
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
  readonly name: string;

  @ApiProperty({
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  readonly is_first_access: boolean;

  @ApiProperty({
    example: 'dudu_ac130@hotmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'co-leader',
  })
  @IsNotEmpty()
  readonly role: AdminRoleDto;

  constructor(admin: Admin & { role: AdminRole }) {
    const { name, email, role, id, is_first_access } = admin;
    this.is_first_access = is_first_access;
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = new AdminRoleDto(role);
  }
}
