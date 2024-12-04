import { ApiProperty } from '@nestjs/swagger';
import { CastRoles, Categories } from '@prisma/client';

export class ResponseMovieDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: Categories;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  release_date: Date;

  @ApiProperty()
  expiring_date: Date;

  @ApiProperty()
  price: number;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  coverurl: string;

  @ApiProperty()
  genres: { genre: { title: string } }[];

  @ApiProperty()
  languages: { language: { title: string } }[];

  @ApiProperty()
  theatres: {
    showTiming: string;
    theatre: { name: string; screens: { title: string }[] };
  }[];

  @ApiProperty()
  casts: { casts: { name: string }; role: CastRoles }[];

  @ApiProperty()
  pictureQualities: { pictureQuality: { title: string } }[];
}
