import { Body, Get, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private readonly databaseService: DatabaseService) {}

  createGenre(createGenreDto: CreateGenreDto) {
    return this.databaseService.genre.create({
      data: createGenreDto,
    });
  }

  getAllGenres() {
    return this.databaseService.genre.findMany();
  }

  getGenreById(genreId: string) {
    return this.databaseService.genre.findUnique({
      where: {
        id: genreId,
      },
    });
  }

  updateGenreById(genreId: string, updateGenreDto: UpdateGenreDto) {
    return this.databaseService.genre.update({
      where: {
        id: genreId,
      },
      data: updateGenreDto,
    });
  }

  deleteGenreById(genreId: string) {
    return this.databaseService.genre.delete({
      where: {
        id: genreId,
      },
    });
  }
}
