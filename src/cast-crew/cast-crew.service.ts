import { Injectable } from '@nestjs/common';
import { CreateCastCrewDto } from './dto/create-cast-crew.dto';
import { UpdateCastCrewDto } from './dto/update-cast-crew.dto';
import { DatabaseService } from 'src/database/database.service';
import { ResponseCastDto } from './dto/response-cast-crew.dto';

@Injectable()
export class CastCrewService {
  constructor(private readonly databaseService: DatabaseService) {}

  createCastCrew(
    createCastCrewDto: CreateCastCrewDto,
  ): Promise<ResponseCastDto> {
    return this.databaseService.cast.create({
      data: createCastCrewDto,
    });
  }

  getAllCastCrew(movieId?: string): Promise<ResponseCastDto[]> {
    if (movieId) {
      return this.databaseService.cast.findMany({
        where: {
          movie: { some: { movieId } },
        },
      });
    }

    return this.databaseService.cast.findMany();
  }

  getCastCrewById(id: string): Promise<ResponseCastDto> {
    return this.databaseService.cast.findUnique({
      where: {
        id,
      },
    });
  }

  updateCastCrewById(
    id: string,
    updateCastCrewDto: UpdateCastCrewDto,
  ): Promise<ResponseCastDto> {
    return this.databaseService.cast.update({
      where: {
        id,
      },
      data: updateCastCrewDto,
    });
  }

  deleteCastCrewById(id: string): Promise<ResponseCastDto> {
    return this.databaseService.cast.delete({
      where: {
        id,
      },
    });
  }
}
