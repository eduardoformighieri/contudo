import { ApiProperty } from '@nestjs/swagger';
import { IsPassword } from 'src/common/validators/isPassword';

export class SignUpDto {
  @ApiProperty({ example: '1234qwer' })
  @IsPassword()
  readonly password: string;
}
