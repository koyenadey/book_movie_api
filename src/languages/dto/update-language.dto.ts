import { PartialType } from '@nestjs/mapped-types';
import { CreateLanguageDto } from './create-language.dto';
import {
  IsAlpha,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {
  @IsAlpha()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(25)
  @ApiProperty()
  title?: string;

  @IsAlpha()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  @ApiProperty()
  code?: string;
}
