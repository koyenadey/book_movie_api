import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import {
  IsAlphanumeric,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MovieTheatreCreateType } from 'src/common/type';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto {
  @ApiProperty()
  @MinLength(3, {
    message: 'A name must be atleast $constraint1 characters long',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @MaxLength(300, { message: 'description cannot be more than 300 characters' })
  @ApiProperty()
  @IsOptional()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty()
  @IsOptional()
  rating?: number;

  @IsDateString()
  @ApiProperty()
  @IsOptional()
  expiring_date?: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty()
  @IsOptional()
  price?: number;

  @IsUrl()
  @IsString()
  @ApiProperty()
  @IsOptional()
  thumbnail?: string;

  @IsUrl()
  @IsString()
  @ApiProperty()
  @IsOptional()
  coverurl?: string;
}
