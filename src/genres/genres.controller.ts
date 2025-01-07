import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGenreDto } from 'src/genres/dto/create-genre.dto';
import { GenresService } from './genres.service';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseGenreDto } from './dto/response-genre.dto';
import { AutheGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { member_roles } from '@prisma/client';

@Controller('genres')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Post()
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
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
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiOkResponse({ type: ResponseGenreDto })
  getGenreById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseGenreDto> {
    return this.genreService.getGenreById(id);
  }

  @Patch(':id')
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiBody({ type: UpdateGenreDto })
  @ApiOkResponse({ type: ResponseGenreDto })
  updateGenreById(
    @Body(ValidationPipe) updateGenreDto: UpdateGenreDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseGenreDto> {
    return this.genreService.updateGenreById(id, updateGenreDto);
  }

  @Delete(':id')
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiOkResponse({ type: ResponseGenreDto })
  deleteGenreById(@Param('id') id: string): Promise<ResponseGenreDto> {
    return this.genreService.deleteGenreById(id);
  }
}
