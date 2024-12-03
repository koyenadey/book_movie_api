import { Module } from '@nestjs/common';
import { TheatresService } from './theatres.service';
import { TheatresController } from './theatres.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TheatresController],
  providers: [TheatresService],
})
export class TheatresModule {}
