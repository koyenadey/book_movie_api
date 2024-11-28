import { Injectable } from '@nestjs/common';
import { CreateSnackDto } from './dto/create-snack.dto';
import { UpdateSnackDto } from './dto/update-snack.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SnacksService {
  constructor(private readonly databaseService: DatabaseService) {}

  CreateSnack(createSnackDto: CreateSnackDto) {
    return this.databaseService.snack.create({
      data: createSnackDto,
      include: {
        theatre: { select: { name: true, city: true, location: true } },
      },
    });
  }

  getAllSnacks(theatreId?: string) {
    if (theatreId)
      return this.databaseService.snack.findMany({
        include: {
          theatre: { select: { name: true, city: true, location: true } },
        },
        where: {
          theatreId,
        },
      });
    return this.databaseService.snack.findMany();
  }

  getSnackDetailsById(id: string) {
    return this.databaseService.snack.findUnique({
      include: {
        theatre: { select: { name: true, city: true, location: true } },
      },
      where: {
        id,
      },
    });
  }

  updateSnackById(id: string, updateSnackDto: UpdateSnackDto) {
    return this.databaseService.snack.update({
      include: {
        theatre: { select: { name: true, city: true, location: true } },
      },
      where: {
        id,
      },
      data: updateSnackDto,
    });
  }

  deletSnackById(id: string) {
    return this.databaseService.snack.delete({
      where: {
        id,
      },
    });
  }
}
