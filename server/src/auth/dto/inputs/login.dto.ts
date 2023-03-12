import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from 'src/common/validators/isPassword';

export class LoginDto {
  @ApiProperty({
    example: 'cr7@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '1234qwer' })
  @IsPassword()
  readonly password: string;
}
