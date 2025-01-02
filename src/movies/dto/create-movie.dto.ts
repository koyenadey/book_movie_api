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
  IsUUID,
} from 'class-validator';

class Movie_Genre {
  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  genreId: string;
}

class Movie_Language {
  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  languageId: string;
}

class Movie_Cast {
  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  castId: string;

  @ApiProperty()
  @IsEnum(cast_roles)
  @IsNotEmpty()
  role: cast_roles;
}

class Movie_Theatre {
  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  theatreId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  screenId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  showTiming: string;
}

class Movie_PictQuality {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  qualityId: string;
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
  @ApiProperty({ enum: categories })
  category: categories;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @ApiProperty({ example: 2.3 })
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
  @ApiProperty({ example: 20.99 })
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
  @ValidateNested({ each: true })
  @Type(() => Movie_Language)
  @ApiProperty({ isArray: true, type: Movie_Language })
  languages: Movie_Language[]; //language junction table

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Movie_Theatre)
  @ApiProperty({ isArray: true, type: Movie_Theatre })
  theatres: Movie_Theatre[]; //theatres junction table

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Movie_Cast)
  @ApiProperty({ isArray: true, type: Movie_Cast })
  casts: Movie_Cast[]; //casts junction table

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Movie_PictQuality)
  @ApiProperty({ isArray: true, type: Movie_PictQuality })
  pictureQualities: Movie_PictQuality[]; //pictureQualities junction table
}
