import { Injectable, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { create } from 'domain';
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
      //create in movie-table
      const createdMovie = await this.databaseService.movie.create({
        data: movieData,
      });

      //create in movie_genres table
      const genresData = genres.map((genreId) => ({
        movieId: createdMovie.id,
        genreId,
      }));
      const movie_genres =
        await this.databaseService.movie_Genre.createManyAndReturn({
          data: genresData,
          select: { genre: { select: { title: true } } },
        });

      //create in movie_languages table
      const languagesData = languages.map((languageId) => ({
        movieId: createdMovie.id,
        languageId,
      }));
      const movie_languages =
        await this.databaseService.movie_Language.createManyAndReturn({
          data: languagesData,
          select: { language: { select: { title: true } } },
        });

      //create in movie_theatres table
      const theatresData = theatres.map((theatre) => ({
        movieId: createdMovie.id,
        ...theatre,
      }));
      const movie_theatres =
        await this.databaseService.movie_Theatre.createManyAndReturn({
          data: theatresData,
          select: {
            showTiming: true,
            theatre: {
              select: { name: true, screens: { select: { title: true } } },
            },
          },
        });

      //create in movie_PictureQuality table
      const pictureQualityData = pictureQualities.map((pictureQualityId) => ({
        movieId: createdMovie.id,
        pictureQualityId,
      }));
      const movie_PictureQualities =
        await this.databaseService.movie_PictureQuality.createManyAndReturn({
          data: pictureQualityData,
          select: {
            pictureQuality: { select: { title: true } },
          },
        });

      //create in movie_casts table
      const movieCastData = casts.map((cast) => ({
        movieId: createdMovie.id,
        ...cast,
      }));
      const movie_casts =
        await this.databaseService.movie_CastCrew.createManyAndReturn({
          data: movieCastData,
          select: {
            role: true,
            casts: { select: { name: true } },
          },
        });

      return {
        ...createdMovie,
        genres: movie_genres,
        languages: movie_languages,
        theatres: movie_theatres,
        casts: movie_casts,
        pictureQualities: movie_PictureQualities,
      };
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
