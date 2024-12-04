import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ResponseGenreDto } from './dto/response-genre.dto';

@Injectable()
export class GenresService {
  constructor(private readonly databaseService: DatabaseService) {}

  createGenre(createGenreDto: CreateGenreDto): Promise<ResponseGenreDto> {
    return this.databaseService.genre.create({
      data: createGenreDto,
    });
  }

  getAllGenres(): Promise<ResponseGenreDto[]> {
    return this.databaseService.genre.findMany();
  }

  getGenreById(genreId: string): Promise<ResponseGenreDto> {
    return this.databaseService.genre.findUnique({
      where: {
        id: genreId,
      },
    });
  }

  updateGenreById(
    genreId: string,
    updateGenreDto: UpdateGenreDto,
  ): Promise<ResponseGenreDto> {
    return this.databaseService.genre.update({
      where: {
        id: genreId,
      },
      data: updateGenreDto,
    });
  }

  deleteGenreById(genreId: string): Promise<ResponseGenreDto> {
    return this.databaseService.genre.delete({
      where: {
        id: genreId,
      },
    });
  }
}
