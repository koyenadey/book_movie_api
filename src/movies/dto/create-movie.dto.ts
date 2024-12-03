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

enum Categories {
  UA = 'UA',
  A = 'A',
  KIDS = 'KIDS',
}

enum PictureQualities {
  TwoD = 'TwoD',
  ThreeD = 'ThreeD',
  IMAX2D = 'IMAX2D',
  IMAX3D = 'IMAX3D',
}

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

  @IsEnum(PictureQualities)
  @IsNotEmpty()
  @IsString()
  pictureQuality: PictureQualities;

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
  genreIds: string[]; //genres junction table

  @IsArray()
  languages: string[]; //language junction table

  @IsArray()
  theatres: string[]; //theatres junction table

  @IsArray()
  casts: string[]; //casts junction table

  @IsArray()
  pictureQualities: string[]; //pictureQualities junction table
}
