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
  UseGuards,
} from '@nestjs/common';
import { CastCrewService } from './cast-crew.service';
import { CreateCastCrewDto } from './dto/create-cast-crew.dto';
import { UpdateCastCrewDto } from './dto/update-cast-crew.dto';
import { OptionalUUIDPipe } from 'src/pipes/optionalUuidPipe.pipe';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ResponseCastDto } from './dto/response-cast-crew.dto';
import { AutheGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { member_roles } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CastQueryParamsDto } from './dto/query-params.dto';

@Controller('casts')
export class CastCrewController {
  constructor(private readonly castCrewService: CastCrewService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
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
    @Query() query: CastQueryParamsDto,
  ): Promise<ResponseCastDto[]> {
    const { pageNo, limit, movieId } = query;
    return this.castCrewService.getAllCastCrew(movieId, pageNo, limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseCastDto })
  getCastCrewById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseCastDto> {
    return this.castCrewService.getCastCrewById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiBody({ type: UpdateCastCrewDto })
  @ApiOkResponse({ type: ResponseCastDto })
  updateCastCrewById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateCastCrewDto: UpdateCastCrewDto,
  ): Promise<ResponseCastDto> {
    return this.castCrewService.updateCastCrewById(id, updateCastCrewDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiOkResponse({ type: ResponseCastDto })
  deleteCastCrewById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseCastDto> {
    return this.castCrewService.deleteCastCrewById(id);
  }
}
