import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGenreDto } from 'src/genre/dto/create-genre.dto';
import { GenresService } from './genres.service';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Post()
  createGenre(@Body(ValidationPipe) createGenreDto: CreateGenreDto) {
    return this.genreService.createGenre(createGenreDto);
  }

  @Get()
  getAllGenres() {
    return this.genreService.getAllGenres();
  }

  @Get(':id')
  getGenreById(@Param('id', ParseUUIDPipe) id: string) {
    return this.genreService.getGenreById(id);
  }

  @Patch(':id')
  updateGenreById(
    @Body(ValidationPipe) updateGenreDto: UpdateGenreDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.genreService.updateGenreById(id, updateGenreDto);
  }

  @Delete(':id')
  deleteGenreById(@Param('id') id: string) {
    return this.genreService.deleteGenreById(id);
  }
}
