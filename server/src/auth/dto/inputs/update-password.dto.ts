import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsPassword } from 'src/common/validators/isPassword';

export class UpdatePasswordDto {
  @ApiProperty({ example: '1234qwer' })
  @IsPassword()
  readonly oldPassword: string;

  @ApiProperty({ example: 'abcd1234' })
  @IsPassword()
  readonly newPassword: string;
}
