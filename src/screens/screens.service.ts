import { Injectable } from '@nestjs/common';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ScreensService {
  constructor(private readonly databaseService: DatabaseService) {}

  createScreen(createScreenDto: CreateScreenDto) {
    return this.databaseService.screen.create({
      include: {
        theatre: { select: { name: true, city: true, location: true } },
      },
      data: createScreenDto,
    });
  }

  getAllScreens(theatreId?: string) {
    if (theatreId)
      return this.databaseService.screen.findMany({
        include: {
          theatre: { select: { name: true, city: true, location: true } },
        },
        where: {
          theatreId,
        },
      });
    return this.databaseService.screen.findMany();
  }

  findScreenById(id: string) {
    return this.databaseService.screen.findUnique({
      include: {
        theatre: { select: { name: true, city: true, location: true } },
      },
      where: {
        id,
      },
    });
  }

  updateScreenById(id: string, updateScreenDto: UpdateScreenDto) {
    return this.databaseService.screen.update({
      include: {
        theatre: { select: { name: true, city: true, location: true } },
      },
      where: {
        id,
      },
      data: updateScreenDto,
    });
  }

  removeScreenById(id: string) {
    return this.databaseService.screen.delete({
      include: {
        theatre: { select: { name: true, city: true, location: true } },
      },
      where: {
        id,
      },
    });
  }
}
