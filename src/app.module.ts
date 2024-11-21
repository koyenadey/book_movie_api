import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [MoviesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
