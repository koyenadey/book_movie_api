import { Module } from '@nestjs/common';
import { PictureQualitiesService } from './picture-qualities.service';
import { PictureQualitiesController } from './picture-qualities.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PictureQualitiesController],
  providers: [PictureQualitiesService],
})
export class PictureQualitiesModule {}
