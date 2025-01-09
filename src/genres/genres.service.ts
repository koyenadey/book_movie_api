import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ResponseGenre, ResponseGenreDto } from './dto/response-genre.dto';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from 'src/common/utils/constants';
import { count } from 'console';

@Injectable()
export class GenresService {
  constructor(private readonly databaseService: DatabaseService) {}

  createGenre(createGenreDto: CreateGenreDto): Promise<ResponseGenre> {
    return this.databaseService.genre.create({
      data: createGenreDto,
    });
  }

  async getAllGenres(
    pageNo = DEFAULT_PAGE_NO,
    limit = DEFAULT_PAGE_SIZE,
  ): Promise<ResponseGenreDto> {
    const genres = await this.databaseService.genre.findMany({
      skip: (pageNo - 1) * limit,
      take: limit,
    });
    return {
      genres,
      count: genres?.length,
    };
  }

  getGenreById(genreId: string): Promise<ResponseGenre> {
    return this.databaseService.genre.findUnique({
      where: {
        id: genreId,
      },
    });
  }

  updateGenreById(
    genreId: string,
    updateGenreDto: UpdateGenreDto,
  ): Promise<ResponseGenre> {
    return this.databaseService.genre.update({
      where: {
        id: genreId,
      },
      data: updateGenreDto,
    });
  }

  deleteGenreById(genreId: string): Promise<ResponseGenre> {
    return this.databaseService.genre.delete({
      where: {
        id: genreId,
      },
    });
  }
}
