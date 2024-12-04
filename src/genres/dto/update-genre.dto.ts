import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @IsAlpha()
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Title should be atleast 3 characters long!' })
  @MaxLength(20, { message: 'Title should be atmost 20 characters long!' })
  @ApiProperty()
  title: string;
}
