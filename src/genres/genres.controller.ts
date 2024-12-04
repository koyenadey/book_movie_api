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
import { CreateGenreDto } from 'src/genres/dto/create-genre.dto';
import { GenresService } from './genres.service';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseGenreDto } from './dto/response-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Post()
  @ApiBody({ type: CreateGenreDto })
  @ApiCreatedResponse({ type: ResponseGenreDto })
  createGenre(
    @Body(ValidationPipe) createGenreDto: CreateGenreDto,
  ): Promise<ResponseGenreDto> {
    return this.genreService.createGenre(createGenreDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseGenreDto })
  getAllGenres(): Promise<ResponseGenreDto[]> {
    return this.genreService.getAllGenres();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseGenreDto })
  getGenreById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseGenreDto> {
    return this.genreService.getGenreById(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateGenreDto })
  @ApiOkResponse({ type: ResponseGenreDto })
  updateGenreById(
    @Body(ValidationPipe) updateGenreDto: UpdateGenreDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseGenreDto> {
    return this.genreService.updateGenreById(id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseGenreDto })
  deleteGenreById(@Param('id') id: string): Promise<ResponseGenreDto> {
    return this.genreService.deleteGenreById(id);
  }
}
