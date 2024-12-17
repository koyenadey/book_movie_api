import { Injectable, Query } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ResponseMovieDto } from './dto/response-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<ResponseMovieDto> {
    const {
      genres,
      languages,
      theatres,
      casts,
      pictureQualities,
      ...movieData
    } = createMovieDto;

    try {
      const result: ResponseMovieDto = await this.databaseService.$queryRaw`
        SELECT * FROM register_movie(
          ${JSON.stringify(movieData)}::jsonb,
          ${JSON.stringify(languages)}::jsonb,
          ${JSON.stringify(theatres)}::jsonb,
          ${JSON.stringify(casts)}::jsonb,
          ${JSON.stringify(genres)}::jsonb,
          ${JSON.stringify(pictureQualities)}::jsonb
        )
      `;

      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAll(@Query('genreId') genreId?: string) {
    const movies = await this.databaseService.movie.findMany({
      include: {
        genres: {
          select: { genre: { select: { id: true, title: true } } },
        },
        pictureQualites: {
          select: {
            pictureQuality: {
              select: { title: true },
            },
          },
        },
      },
    });
    if (genreId) {
      const foundGenre = await this.databaseService.genre.findUnique({
        where: { id: genreId },
      });
      if (foundGenre) {
        return movies.filter((movie) =>
          movie.genres.some((genre) => genre.genre.id === genreId),
        );
      }
    }
    return movies;
  }

  findOne(id: string) {
    return this.databaseService.movie.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return '';
    // return this.databaseService.movie.update({
    //   where: {
    //     id,
    //   },
    //   data: updateMovieDto,
    // });
  }

  remove(id: string) {
    return this.databaseService.movie.delete({
      where: {
        id,
      },
    });
  }
}
