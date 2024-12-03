import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { TheatresService } from './theatres.service';
import { CreateTheatreDto } from './dto/create-theatre.dto';
import { UpdateTheatreDto } from './dto/update-theatre.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseTheatreDto } from './dto/response-theatre.dto';

@Controller('theatres')
export class TheatresController {
  constructor(private readonly theatresService: TheatresService) {}

  @Post()
  @ApiBody({ type: CreateTheatreDto })
  @ApiCreatedResponse({ type: ResponseTheatreDto })
  createTheatre(
    @Body(ValidationPipe) createTheatreDto: CreateTheatreDto,
  ): Promise<ResponseTheatreDto> {
    return this.theatresService.createTheatre(createTheatreDto);
  }

  @Get()
  @ApiOkResponse({ isArray: true, type: ResponseTheatreDto })
  findAll(): Promise<ResponseTheatreDto[]> {
    return this.theatresService.getAllTheatres();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseTheatreDto })
  getTheatre(@Param('id', ParseUUIDPipe) id: string) {
    return this.theatresService.getTheatre(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateTheatreDto })
  @ApiResponse({ type: ResponseTheatreDto })
  updateTheatre(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateTheatreDto: UpdateTheatreDto,
  ) {
    return this.theatresService.updateTheatre(id, updateTheatreDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseTheatreDto })
  deleteTheatre(@Param('id', ParseUUIDPipe) id: string) {
    return this.theatresService.deleteTheatre(id);
  }
}
