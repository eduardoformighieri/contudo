import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  isArray,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';

export class CreateReportAsGuestDto {
  @ApiProperty({
    example: 'Marco Antonio',
  })
  @IsNotEmpty()
  @IsString()
  readonly guest_identity: string;

  @ApiProperty({
    example: '0',
  })
  @IsNotEmpty()
  @IsString()
  readonly categoryId: string;

  @ApiProperty({
    example: 'Stephen behavior',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'I saw Stephen doing some weird...',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  // prettier-ignore
  @ApiProperty({
    example: ["http//aws/image/2737sj379s", "http//aws/audio/2737sj379s"],
  })
// prettier-ignore
  @IsOptional()
  @ArrayMinSize(1)
  @IsString({ each: true })
  readonly attachmentUrls: string[];
}
