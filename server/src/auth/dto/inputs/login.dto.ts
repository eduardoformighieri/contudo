import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'cr7@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @ApiProperty({ example: '123456789' })
  readonly password: string;
}
