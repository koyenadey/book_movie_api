import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGenreDto } from 'src/genres/dto/create-genre.dto';
import { GenresService } from './genres.service';
import { UpdateGenreDto } from './dto/update-genre.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ResponseGenre, ResponseGenreDto } from './dto/response-genre.dto';
import { AutheGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { member_roles } from '@prisma/client';
import { GenreQueryParamsDto } from './dto/query-params.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiBody({ type: CreateGenreDto })
  @ApiCreatedResponse({ type: ResponseGenre })
  createGenre(
    @Body(ValidationPipe) createGenreDto: CreateGenreDto,
  ): Promise<ResponseGenre> {
    return this.genreService.createGenre(createGenreDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseGenreDto })
  getAllGenres(@Query() query: GenreQueryParamsDto): Promise<ResponseGenreDto> {
    const { pageNo, limit } = query;
    return this.genreService.getAllGenres(pageNo, limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseGenre })
  getGenreById(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseGenre> {
    return this.genreService.getGenreById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiBody({ type: UpdateGenreDto })
  @ApiOkResponse({ type: ResponseGenre })
  updateGenreById(
    @Body(ValidationPipe) updateGenreDto: UpdateGenreDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseGenre> {
    return this.genreService.updateGenreById(id, updateGenreDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiOkResponse({ type: ResponseGenre })
  deleteGenreById(@Param('id') id: string): Promise<ResponseGenre> {
    return this.genreService.deleteGenreById(id);
  }
}
