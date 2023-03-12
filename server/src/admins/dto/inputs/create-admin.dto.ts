import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
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
    example: '123456789',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({
    example: 'Co-leader',
  })
  @IsNotEmpty()
  @IsString()
  readonly role: string;
}
