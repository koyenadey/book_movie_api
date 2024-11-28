import { Module } from '@nestjs/common';
import { CastCrewService } from './cast-crew.service';
import { CastCrewController } from './cast-crew.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CastCrewController],
  providers: [CastCrewService],
})
export class CastCrewModule {}
