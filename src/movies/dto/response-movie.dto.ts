import { ApiProperty } from '@nestjs/swagger';
import { cast_roles, categories } from '@prisma/client';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

class ResponseMovieGenre {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}
class ResponseMovieLang {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}

class ResponseMovieScreen {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}
class ResponseMovieTheatre {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  showTime: string;

  @ApiProperty({ isArray: true, type: ResponseMovieScreen })
  screens: ResponseMovieScreen[];
}

class ResponseMovieCast {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: cast_roles })
  role: cast_roles;

  @ApiProperty()
  imageUrl: string;
}

class ResponseMoviePictQual {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}

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

  @ApiProperty({ isArray: true, type: ResponseMovieGenre })
  genres: ResponseMovieGenre[];

  @ApiProperty({ isArray: true, type: ResponseMovieLang })
  languages: ResponseMovieLang[];

  @ApiProperty({ isArray: true, type: ResponseMovieTheatre })
  theatres: ResponseMovieTheatre[];

  @ApiProperty({ isArray: true, type: ResponseMovieCast })
  casts: ResponseMovieCast[];

  @ApiProperty({ isArray: true, type: ResponseMoviePictQual })
  picture_qualities: ResponseMoviePictQual[];
}
