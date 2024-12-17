import { Injectable } from '@nestjs/common';
import { CreatePictureQualityDto } from './dto/create-picture-quality.dto';
import { UpdatePictureQualityDto } from './dto/update-picture-quality.dto';
import { DatabaseService } from 'src/database/database.service';
import { ResponsePictureQuality } from './dto/response-picture-quality.dto';

@Injectable()
export class PictureQualitiesService {
  constructor(private readonly databaseService: DatabaseService) {}

  createPictQuality(
    createPictureQualityDto: CreatePictureQualityDto,
  ): Promise<ResponsePictureQuality> {
    return this.databaseService.picturequality.create({
      data: createPictureQualityDto,
    });
  }

  getAllPictQualities(): Promise<ResponsePictureQuality[]> {
    return this.databaseService.picturequality.findMany();
  }

  getDetailsById(id: string): Promise<ResponsePictureQuality> {
    return this.databaseService.picturequality.findUnique({
      where: { id },
    });
  }

  updateQualityById(
    id: string,
    updatePictureQualityDto: UpdatePictureQualityDto,
  ): Promise<ResponsePictureQuality> {
    return this.databaseService.picturequality.update({
      where: { id },
      data: updatePictureQualityDto,
    });
  }

  removeQualityById(id: string): Promise<ResponsePictureQuality> {
    return this.databaseService.picturequality.delete({
      where: { id },
    });
  }
}
