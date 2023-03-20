import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddEmailToReportDto {
  @ApiProperty({
    example: 'cr7@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
