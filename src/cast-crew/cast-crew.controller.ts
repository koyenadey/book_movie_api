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
  Query,
} from '@nestjs/common';
import { CastCrewService } from './cast-crew.service';
import { CreateCastCrewDto } from './dto/create-cast-crew.dto';
import { UpdateCastCrewDto } from './dto/update-cast-crew.dto';
import { OptionalUUIDPipe } from 'src/pipes/optionalUuidPipe.pipe';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseCastDto } from './dto/response-cast-crew.dto';

@Controller('casts')
export class CastCrewController {
  constructor(private readonly castCrewService: CastCrewService) {}

  @Post()
  @ApiBody({ type: CreateCastCrewDto })
  @ApiCreatedResponse({ type: ResponseCastDto })
  createCastCrew(
    @Body(ValidationPipe) createCastCrewDto: CreateCastCrewDto,
  ): Promise<ResponseCastDto> {
    return this.castCrewService.createCastCrew(createCastCrewDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseCastDto })
  getAllCastCrew(
    @Query('movieId', OptionalUUIDPipe) movieId?: string,
  ): Promise<ResponseCastDto[]> {
    return this.castCrewService.getAllCastCrew(movieId);
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseCastDto })
  getCastCrewById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseCastDto> {
    return this.castCrewService.getCastCrewById(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCastCrewDto })
  @ApiOkResponse({ type: ResponseCastDto })
  updateCastCrewById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateCastCrewDto: UpdateCastCrewDto,
  ): Promise<ResponseCastDto> {
    return this.castCrewService.updateCastCrewById(id, updateCastCrewDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseCastDto })
  deleteCastCrewById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseCastDto> {
    return this.castCrewService.deleteCastCrewById(id);
  }
}
