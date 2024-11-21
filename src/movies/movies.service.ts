import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { create } from 'domain';

@Injectable()
export class MoviesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createMovieDto: CreateMovieDto) {
    const { genreIds, ...movieData } = createMovieDto;
    try {
      return this.databaseService.movie.create({
        data: {
          ...movieData,
          genres: {
            create: genreIds.map((genreId) => ({
              genre: { connect: { id: genreId } },
            })),
          },
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  findAll() {
    return this.databaseService.movie.findMany({
      include: {
        genres: {
          select: { genre: { select: { title: true } } },
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
  }

  findOne(id: string) {
    return this.databaseService.movie.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateMovieDto: Prisma.MovieUpdateInput) {
    return this.databaseService.movie.update({
      where: {
        id,
      },
      data: updateMovieDto,
    });
  }

  remove(id: string) {
    return this.databaseService.movie.delete({
      where: {
        id,
      },
    });
  }
}
