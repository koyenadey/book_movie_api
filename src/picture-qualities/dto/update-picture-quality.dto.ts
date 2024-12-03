import { PartialType } from '@nestjs/mapped-types';
import { CreatePictureQualityDto } from './create-picture-quality.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePictureQualityDto extends PartialType(
  CreatePictureQualityDto,
) {
  @ApiProperty({ example: 'IMAX-3D' })
  title: string;
}
