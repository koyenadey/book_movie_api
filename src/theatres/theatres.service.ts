import { Injectable } from '@nestjs/common';
import { CreateTheatreDto } from './dto/create-theatre.dto';
import { UpdateTheatreDto } from './dto/update-theatre.dto';
import { DatabaseService } from 'src/database/database.service';
import { ResponseTheatreDto } from './dto/response-theatre.dto';

@Injectable()
export class TheatresService {
  constructor(private readonly databaseService: DatabaseService) {}

  createTheatre(
    createTheatreDto: CreateTheatreDto,
  ): Promise<ResponseTheatreDto> {
    return this.databaseService.theatre.create({
      data: createTheatreDto,
    });
  }

  getAllTheatres(): Promise<ResponseTheatreDto[]> {
    return this.databaseService.theatre.findMany();
  }

  getTheatre(id: string) {
    return this.databaseService.theatre.findUnique({
      where: {
        id,
      },
    });
  }

  updateTheatre(id: string, updateTheatreDto: UpdateTheatreDto) {
    return this.databaseService.theatre.update({
      where: { id },
      data: updateTheatreDto,
    });
  }

  deleteTheatre(id: string) {
    return this.databaseService.theatre.delete({
      where: { id },
    });
  }
}
