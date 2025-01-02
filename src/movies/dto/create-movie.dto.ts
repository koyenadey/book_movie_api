import { ApiProperty } from '@nestjs/swagger';
import { cast_roles, categories } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsNumber,
  IsAlphanumeric,
  IsDateString,
  IsArray,
  IsUrl,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import {
  Movie_Language,
  Movie_PictQuality,
  MovieCastsCreateType,
  MovieTheatreCreateType,
} from 'src/common/type';

class Movie_Genre {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  genreId: string;
}
export class CreateMovieDto {
  @ApiProperty()
  @MinLength(3, {
    message: 'A name must be atleast $constraint1 characters long',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(300, { message: 'description cannot be more than 300 characters' })
  description: string;

  @IsEnum(categories)
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  category: categories;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @ApiProperty()
  rating: number;

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @ApiProperty()
  duration: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  release_date: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  expiring_date: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  @ApiProperty()
  thumbnail: string;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  @ApiProperty()
  coverurl: string;

  @ApiProperty({ isArray: true, type: Movie_Genre })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true, message: 'Each item must be a valid genre' })
  @Type(() => Movie_Genre)
  genres: Movie_Genre[]; //genres junction table

  @IsArray()
  @ApiProperty()
  languages: Movie_Language[]; //language junction table

  @IsArray()
  @ApiProperty()
  theatres: MovieTheatreCreateType[]; //theatres junction table

  @IsArray()
  @ApiProperty()
  casts: MovieCastsCreateType[]; //casts junction table

  @IsArray()
  @ApiProperty()
  pictureQualities: Movie_PictQuality[]; //pictureQualities junction table
}
