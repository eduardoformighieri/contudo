import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Admin, AdminRole, Prisma } from '@prisma/client';

export class AdminWithRoleDto {
  @ApiProperty({
    example: 'Marco Antonio',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

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
  @IsString()
  readonly role: string;

  constructor(admin: Admin & { role: AdminRole }) {
    const { name, email, role } = admin;
    this.name = name;
    this.email = email;
    this.role = role.name;
  }
}
