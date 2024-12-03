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
    return this.databaseService.pictureQuality.create({
      data: createPictureQualityDto,
    });
  }

  getAllPictQualities(): Promise<ResponsePictureQuality[]> {
    return this.databaseService.pictureQuality.findMany();
  }

  getDetailsById(id: string): Promise<ResponsePictureQuality> {
    return this.databaseService.pictureQuality.findUnique({
      where: { id },
    });
  }

  updateQualityById(
    id: string,
    updatePictureQualityDto: UpdatePictureQualityDto,
  ): Promise<ResponsePictureQuality> {
    return this.databaseService.pictureQuality.update({
      where: { id },
      data: updatePictureQualityDto,
    });
  }

  removeQualityById(id: string): Promise<ResponsePictureQuality> {
    return this.databaseService.pictureQuality.delete({
      where: { id },
    });
  }
}
