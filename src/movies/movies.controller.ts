import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Prisma } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { OptionalUUIDPipe } from 'src/pipes/optionalUuidPipe.pipe';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseMovieDto } from './dto/response-movie.dto';
import { ResponseUpdateMovieDto } from './dto/response-update-movie.dto';
import { QueryParamsDto } from './dto/query-params.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiBody({ type: CreateMovieDto })
  @ApiCreatedResponse({ type: ResponseMovieDto })
  createMovie(@Body(ValidationPipe) createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Get()
  @ApiQuery({ required: false, name: 'genreId' })
  @ApiOkResponse({ type: ResponseMovieDto })
  findAll(@Query() query: QueryParamsDto) {
    const { genreId, limit, pageNo } = query;
    return this.moviesService.findAll(pageNo, genreId, limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseMovieDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateMovieDto })
  @ApiOkResponse({ type: ResponseUpdateMovieDto })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseUpdateMovieDto })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
