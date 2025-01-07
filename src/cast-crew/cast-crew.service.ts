import { Injectable } from '@nestjs/common';
import { CreateCastCrewDto } from './dto/create-cast-crew.dto';
import { UpdateCastCrewDto } from './dto/update-cast-crew.dto';
import { DatabaseService } from 'src/database/database.service';
import { ResponseCastDto } from './dto/response-cast-crew.dto';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from 'src/common/utils/constants';
import { take } from 'rxjs';

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

  getAllCastCrew(
    movieId?: string,
    pageNo = DEFAULT_PAGE_NO,
    limit = DEFAULT_PAGE_SIZE,
  ): Promise<ResponseCastDto[]> {
    if (movieId) {
      return this.databaseService.cast.findMany({
        where: {
          movie: { some: { movieId } },
        },
        skip: (pageNo - 1) * limit,
        take: limit,
      });
    }

    return this.databaseService.cast.findMany({
      skip: (pageNo - 1) * limit,
      take: limit,
    });
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
