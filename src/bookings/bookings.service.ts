import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BookingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  createBooking(createBookingDto: CreateBookingDto) {
    return this.databaseService.booking.create({
      select: {
        id: true,
        movie: { select: { name: true, category: true, duration: true } },
        member: { select: { name: true, email: true } },
        bookingDate: true,
        theatre: { select: { name: true, city: true, location: true } },
      },
      data: createBookingDto,
    });
  }

  getAllBookings(movieId?: string, memberId?: string, theatreId?: string) {
    if (movieId && memberId && theatreId)
      return this.databaseService.booking.findMany({
        where: {
          movieId,
          memberId,
          theatreId,
        },
      });
    if (movieId && memberId)
      return this.databaseService.booking.findMany({
        where: {
          movieId,
          memberId,
        },
      });
    if (movieId && theatreId)
      return this.databaseService.booking.findMany({
        where: {
          movieId,
          theatreId,
        },
      });
    if (memberId && theatreId)
      return this.databaseService.booking.findMany({
        where: {
          memberId,
          theatreId,
        },
      });
    if (movieId)
      return this.databaseService.booking.findMany({
        where: { movieId },
      });
    if (memberId)
      return this.databaseService.booking.findMany({
        where: { memberId },
      });
    if (theatreId)
      return this.databaseService.booking.findMany({
        where: { theatreId },
      });
    return this.databaseService.booking.findMany();
  }

  getDetailsById(id: string) {
    return this.databaseService.booking.findUnique({
      where: { id },
    });
  }

  updateById(id: string, updateBookingDto: UpdateBookingDto) {
    return this.databaseService.booking.update({
      where: { id },
      data: updateBookingDto,
    });
  }

  deleteBookingById(id: string) {
    return this.databaseService.booking.delete({
      where: { id },
    });
  }
}
