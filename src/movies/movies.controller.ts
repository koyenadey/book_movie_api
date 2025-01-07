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
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { member_roles, Prisma } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ResponseMovieDto } from './dto/response-movie.dto';
import { ResponseUpdateMovieDto } from './dto/response-update-movie.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AutheGuard } from 'src/auth/guards/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiBody({ type: CreateMovieDto })
  @ApiCreatedResponse({ type: ResponseMovieDto })
  createMovie(@Body(ValidationPipe) createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseMovieDto })
  findAll(@Query() query: QueryParamsDto) {
    const { genreId, limit, pageNo } = query;
    return this.moviesService.findAll(pageNo, genreId, limit ? +limit : limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseMovieDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AutheGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(member_roles.Admin)
  @ApiBody({ type: UpdateMovieDto })
  @ApiOkResponse({ type: ResponseUpdateMovieDto })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiOkResponse({ type: ResponseUpdateMovieDto })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
