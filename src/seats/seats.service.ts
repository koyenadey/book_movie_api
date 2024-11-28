import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SeatsService {
  constructor(private readonly databaseService: DatabaseService) {}

  createSeats(createSeatDto: CreateSeatDto) {
    return this.databaseService.seat.create({
      data: createSeatDto,
    });
  }

  getAllSeats(screenId?: string) {
    if (screenId)
      return this.databaseService.seat.findMany({
        include: {
          // Please include the details of
          screen: {
            // screen relation that refers to the Screen Table
            select: {
              //Select
              title: true, // title to show from Screen table & select
              theatre: {
                // theatre relation of Screen Table that refers to Movie_Theatre jucntion table
                select: {
                  // select the relation theatre again that refers to Theatre table now
                  theatre: {
                    // and now in theatre table
                    select: { name: true, city: true, location: true }, // select the name,city,location to show up
                  },
                },
              },
            },
          },
        },
        where: {
          screenId,
        },
      });
    return this.databaseService.seat.findMany();
  }

  getSeatDetailsById(id: string) {
    return this.databaseService.seat.findUnique({
      include: {
        screen: { select: { title: true } },
      },
      where: {
        id,
      },
    });
  }

  updateSeatsById(id: string, updateSeatDto: UpdateSeatDto) {
    return this.databaseService.seat.update({
      include: {
        screen: { select: { title: true } },
      },
      where: {
        id,
      },
      data: updateSeatDto,
    });
  }

  deletSeatById(id: string) {
    return this.databaseService.seat.delete({
      include: {
        screen: { select: { title: true } },
      },
      where: {
        id,
      },
    });
  }
}
