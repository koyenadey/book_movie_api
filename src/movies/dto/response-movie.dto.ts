import { ApiProperty } from '@nestjs/swagger';
import { cast_roles, categories } from '@prisma/client';

export class ResponseMovieDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: categories;

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
  genres: { id: string; title: string }[];

  @ApiProperty()
  languages: { language: { title: string } }[];

  @ApiProperty()
  theatres: {
    id: string;
    name: string;
    showTime: string;
    screens: { id: string; title: string[] };
  }[];

  @ApiProperty()
  casts: { id: string; name: string; role: cast_roles }[];

  @ApiProperty()
  picture_qualities: { id: string; title: string }[];
}
