import { ApiProperty } from '@nestjs/swagger';
import { categories } from '@prisma/client';

export class ResponseUpdateMovieDto {
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
}
