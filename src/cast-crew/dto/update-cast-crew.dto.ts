import { PartialType } from '@nestjs/mapped-types';
import { CreateCastCrewDto } from './create-cast-crew.dto';
import {
  IsAlpha,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCastCrewDto extends PartialType(CreateCastCrewDto) {
  @IsAlpha('en-US', { message: 'The name should only contain alphabets' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  @ApiProperty()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty()
  imageUrl?: string;
}
