import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    example: '15e1619b-0c6d-4d20-be3e-b633526ad4de',
  })
  @IsNotEmpty()
  @IsString()
  readonly reportId: string;

  @ApiProperty({
    example: 'Admin Team',
  })
  @IsNotEmpty()
  @IsString()
  readonly sentBy: string;

  @ApiProperty({
    example: 'I saw Stephen doing some weird...',
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
