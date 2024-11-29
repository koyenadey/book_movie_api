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
import { SnacksModule } from './snacks/snacks.module';
import { SeatsModule } from './seats/seats.module';
import { ScreensModule } from './screens/screens.module';
import { BookingsModule } from './bookings/bookings.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [
    MoviesModule,
    DatabaseModule,
    GenresModule,
    UsersModule,
    AuthModule,
    LanguagesModule,
    CastCrewModule,
    SnacksModule,
    SeatsModule,
    ScreensModule,
    BookingsModule,
    MembersModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
