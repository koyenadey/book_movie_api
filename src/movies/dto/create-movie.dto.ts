import { CastRoles, Categories } from '@prisma/client';
import {
  IsAlpha,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsNumber,
  isNotEmpty,
  IsAlphanumeric,
  IsDateString,
  IsUUID,
  IsArray,
  IsUrl,
} from 'class-validator';
import { MovieCastsCreateType, MovieTheatreCreateType } from 'src/type';

enum Genres {
  Action = 'Action',
  Adventure = 'Adventure',
  Animation = 'Animation',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Drama',
  Family = 'Family',
  Fantasy = 'Fantasy',
  History = 'History',
  Horror = 'Horror',
  Mystery = 'Mystery',
  Romance = 'Romance',
}

// enum PictureQualities {
//   TwoD = 'TwoD',
//   ThreeD = 'ThreeD',
//   IMAX2D = 'IMAX2D',
//   IMAX3D = 'IMAX3D',
// }

export class CreateMovieDto {
  @MinLength(3, {
    message: 'A name must be atleast $constraint1 characters long',
  })
  @IsAlpha()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300, { message: 'description cannot be more than 300 characters' })
  description: string;

  @IsEnum(Categories)
  @IsNotEmpty()
  @IsString()
  category: Categories;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  duration: string;

  @IsDateString()
  @IsNotEmpty()
  release_date: Date;

  @IsDateString()
  @IsNotEmpty()
  expiring_date: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  coverurl: string;

  @IsArray()
  genres: string[]; //genres junction table

  @IsArray()
  languages: string[]; //language junction table 812edcdc-eccb-4f28-b6cf-2f3d81717fa9,0912f031-40fa-4509-8efc-dbc033f49242

  @IsArray()
  theatres: MovieTheatreCreateType[]; //theatres junction table 3f244730-b824-4da9-8291-58225828699c

  @IsArray()
  casts: MovieCastsCreateType[]; //casts junction table 2d68f5b6-b891-43aa-b445-f11ae4d78cf5q

  @IsArray()
  pictureQualities: string[]; //pictureQualities junction table 06c2d4d9-ef61-41f7-93fe-9a66ec036159, c2b4c8bc-d3ba-41b1-81a7-c7ba7cc509f4
}
