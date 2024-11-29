import { Module } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';
import { DatabaseModule } from 'src/database/database.module';
import { OptionalUUIDPipe } from 'src/pipes/optionalUuidPipe.pipe';

@Module({
  imports: [DatabaseModule],
  controllers: [ScreensController],
  providers: [ScreensService],
})
export class ScreensModule {}
