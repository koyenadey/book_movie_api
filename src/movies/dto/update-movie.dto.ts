import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import {
  IsAlphanumeric,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MovieTheatreCreateType } from 'src/common/type';

export class UpdateMovieDto {
  @MinLength(3, {
    message: 'A name must be atleast $constraint1 characters long',
  })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300, { message: 'description cannot be more than 300 characters' })
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  rating?: number;

  @IsDateString()
  @IsNotEmpty()
  expiring_date?: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price?: number;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  thumbnail?: string;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  coverurl?: string;
}
