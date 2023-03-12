import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({
    example: 'Marco Antonio',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  @ApiProperty({
    example: 'dudu_ac130@hotmail.com',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  readonly email?: string;
}
