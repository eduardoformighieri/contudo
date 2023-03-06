import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Admin, AdminRole, Prisma } from '@prisma/client';

export class JwtPayloadDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyN0BnbWFpbC5jb20iLCJpYXQiOjE2NzgwNzkyNTIsImV4cCI6MTY3ODE2NTY1Mn0.Zs88eOrAvjqvX8KC9Cvu82J5B2wIwJMnFKEhDdCGL1U',
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
    const { name, email, role, id } = admin;
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role.name;
  }
}
