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
import { CastCrewService } from './cast-crew.service';
import { CreateCastCrewDto } from './dto/create-cast-crew.dto';
import { UpdateCastCrewDto } from './dto/update-cast-crew.dto';

@Controller('cast-crew')
export class CastCrewController {
  constructor(private readonly castCrewService: CastCrewService) {}

  @Post()
  createCastCrew(@Body() createCastCrewDto: CreateCastCrewDto) {
    return this.castCrewService.createCastCrew(createCastCrewDto);
  }

  @Get()
  getAllCastCrew() {
    return this.castCrewService.getAllCastCrew();
  }

  @Get(':id')
  getCastCrewById(@Param('id', ParseUUIDPipe) id: string) {
    return this.castCrewService.getCastCrewById(id);
  }

  @Patch(':id')
  updateCastCrewById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateCastCrewDto: UpdateCastCrewDto,
  ) {
    return this.castCrewService.updateCastCrewById(id, updateCastCrewDto);
  }

  @Delete(':id')
  deleteCastCrewById(@Param('id', ParseUUIDPipe) id: string) {
    return this.castCrewService.deleteCastCrewById(id);
  }
}
