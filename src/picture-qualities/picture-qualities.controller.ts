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
  HttpStatus,
} from '@nestjs/common';
import { PictureQualitiesService } from './picture-qualities.service';
import { CreatePictureQualityDto } from './dto/create-picture-quality.dto';
import { UpdatePictureQualityDto } from './dto/update-picture-quality.dto';
import { OptionalUUIDPipe } from 'src/pipes/optionalUuidPipe.pipe';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponsePictureQuality } from './dto/response-picture-quality.dto';

@Controller('picture-qualities')
export class PictureQualitiesController {
  constructor(
    private readonly pictureQualitiesService: PictureQualitiesService,
  ) {}

  @Post()
  @ApiBody({
    type: CreatePictureQualityDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponsePictureQuality,
  })
  createPictQuality(
    @Body(ValidationPipe) createPictureQualityDto: CreatePictureQualityDto,
  ): Promise<ResponsePictureQuality> {
    return this.pictureQualitiesService.createPictQuality(
      createPictureQualityDto,
    );
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: ResponsePictureQuality,
  })
  getAllPictQualities(): Promise<ResponsePictureQuality[]> {
    return this.pictureQualitiesService.getAllPictQualities();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: ResponsePictureQuality })
  getDetailsById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponsePictureQuality> {
    return this.pictureQualitiesService.getDetailsById(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePictureQualityDto })
  @ApiOkResponse({ type: ResponsePictureQuality })
  updateQualityById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updatePictureQualityDto: UpdatePictureQualityDto,
  ): Promise<ResponsePictureQuality> {
    return this.pictureQualitiesService.updateQualityById(
      id,
      updatePictureQualityDto,
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponsePictureQuality })
  removeQualityById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponsePictureQuality> {
    return this.pictureQualitiesService.removeQualityById(id);
  }
}
