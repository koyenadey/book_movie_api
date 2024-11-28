import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { GenresModule } from './genre/genres.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LanguagesModule } from './languages/languages.module';
import { CastCrewModule } from './cast-crew/cast-crew.module';

@Module({
  imports: [MoviesModule, DatabaseModule, GenresModule, UsersModule, AuthModule, LanguagesModule, CastCrewModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
