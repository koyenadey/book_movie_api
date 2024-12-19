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

  async findAll(
    @Query('genreId') genreId?: string,
  ): Promise<ResponseMovieDto[]> {
    if (genreId) {
      const result = await this.databaseService.movie.findMany({
        where: { genres: { some: { genreId } } },
        include: {
          genres: { select: { genre: { select: { id: true, title: true } } } },
          casts: {
            select: {
              role: true,
              casts: { select: { id: true, name: true, imageUrl: true } },
            },
          },
          theatres: {
            select: {
              showTiming: true,
              theatre: {
                select: {
                  id: true,
                  name: true,
                  screens: { select: { id: true, title: true } },
                },
              },
            },
          },
          languages: {
            select: { language: { select: { id: true, title: true } } },
          },
          pictureQualites: {
            select: { pictureQuality: { select: { id: true, title: true } } },
          },
        },
      });

      const tResult: ResponseMovieDto[] = this.transformResponseMovie(result);
      return tResult;
    }

    const movies = await this.databaseService.movie.findMany({
      include: {
        genres: { select: { genre: { select: { id: true, title: true } } } },
        casts: {
          select: {
            role: true,
            casts: { select: { id: true, name: true, imageUrl: true } },
          },
        },
        theatres: {
          select: {
            showTiming: true,
            theatre: {
              select: {
                id: true,
                name: true,
                screens: { select: { id: true, title: true } },
              },
            },
          },
        },
        languages: {
          select: { language: { select: { id: true, title: true } } },
        },
        pictureQualites: {
          select: { pictureQuality: { select: { id: true, title: true } } },
        },
      },
    });
    return this.transformResponseMovie(movies);
  }

  transformResponseMovie(movie): ResponseMovieDto[] {
    const result = movie.map((movie) => ({
      ...movie,
      genres: movie.genres.map((g) => g.genre),
      casts: movie.casts.map((c) => ({ role: c.role, ...c.casts })),
      theatres: movie.theatres.map((t) => ({
        showTime: t.showTiming,
        screens: t.theatre.screens,
        ...t.theatre,
      })),
      languages: movie.languages.map((l) => l.language),
      picture_qualities: movie.pictureQualites.map((pq) => pq.pictureQuality),
    }));
    return result;
  }

  async findOne(id: string): Promise<ResponseMovieDto> {
    const movie = await this.databaseService.movie.findUnique({
      where: {
        id,
      },
      include: {
        genres: { select: { genre: { select: { id: true, title: true } } } },
        casts: {
          select: {
            role: true,
            casts: { select: { id: true, name: true, imageUrl: true } },
          },
        },
        theatres: {
          select: {
            showTiming: true,
            theatre: {
              select: {
                id: true,
                name: true,
                screens: { select: { id: true, title: true } },
              },
            },
          },
        },
        languages: {
          select: { language: { select: { id: true, title: true } } },
        },
        pictureQualites: {
          select: { pictureQuality: { select: { id: true, title: true } } },
        },
      },
    });

    const result: ResponseMovieDto = {
      ...movie,
      genres: movie.genres.map((g) => g.genre),
      casts: movie.casts.map((g) => ({ role: g.role, ...g.casts })),
      theatres: movie.theatres.map((t) => ({
        showTime: t.showTiming,
        screens: t.theatre.screens,
        ...t.theatre,
      })),
      languages: movie.languages.map((l) => l.language),
      picture_qualities: movie.pictureQualites.map((pq) => pq.pictureQuality),
    };

    return result;
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
