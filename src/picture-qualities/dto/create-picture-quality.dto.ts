import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';

export class CreatePictureQualityDto {
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @ApiProperty({ example: 'IMAX-3D' })
  title: string;
}
