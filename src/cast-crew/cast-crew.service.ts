import { Injectable } from '@nestjs/common';
import { CreateCastCrewDto } from './dto/create-cast-crew.dto';
import { UpdateCastCrewDto } from './dto/update-cast-crew.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CastCrewService {
  constructor(private readonly databasService: DatabaseService) {}
  createCastCrew(createCastCrewDto: CreateCastCrewDto) {
    return this.databasService.castCrew.create({
      data: createCastCrewDto,
    });
  }

  getAllCastCrew() {
    return this.databasService.castCrew.findMany();
  }

  getCastCrewById(id: string) {
    return this.databasService.castCrew.findUnique({
      where: {
        id,
      },
    });
  }

  updateCastCrewById(id: string, updateCastCrewDto: UpdateCastCrewDto) {
    return this.databasService.castCrew.update({
      where: {
        id,
      },
      data: updateCastCrewDto,
    });
  }

  deleteCastCrewById(id: string) {
    return this.databasService.castCrew.delete({
      where: {
        id,
      },
    });
  }
}
