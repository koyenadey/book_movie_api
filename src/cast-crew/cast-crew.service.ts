import { Injectable } from '@nestjs/common';
import { CreateCastCrewDto } from './dto/create-cast-crew.dto';
import { UpdateCastCrewDto } from './dto/update-cast-crew.dto';
import { DatabaseService } from 'src/database/database.service';
import { Movie } from '../type';

@Injectable()
export class CastCrewService {
  constructor(private readonly databaseService: DatabaseService) {}
  createCastCrew(createCastCrewDto: CreateCastCrewDto) {
    return this.databaseService.castCrew.create({
      data: createCastCrewDto,
    });
  }

  getAllCastCrew(movieId?: string) {
    if (movieId) {
      return this.databaseService.castCrew.findMany({
        where: {
          movie: { some: { movieId } },
        },
      });
    }

    return this.databaseService.castCrew.findMany();
  }

  getCastCrewById(id: string) {
    return this.databaseService.castCrew.findUnique({
      where: {
        id,
      },
    });
  }

  updateCastCrewById(id: string, updateCastCrewDto: UpdateCastCrewDto) {
    return this.databaseService.castCrew.update({
      where: {
        id,
      },
      data: updateCastCrewDto,
    });
  }

  deleteCastCrewById(id: string) {
    return this.databaseService.castCrew.delete({
      where: {
        id,
      },
    });
  }
}
