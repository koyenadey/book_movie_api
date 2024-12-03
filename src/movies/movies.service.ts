import { Injectable, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { create } from 'domain';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createMovieDto: CreateMovieDto) {
    const { genreIds, ...movieData } = createMovieDto;
    try {
      return '';
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
