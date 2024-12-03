import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { DatabaseService } from 'src/database/database.service';
import { Booking_Seat, Booking_Snack } from '@prisma/client';
import { ResponseBookingDto } from './dto/response-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createBooking(
    createBookingDto: CreateBookingDto,
  ): Promise<ResponseBookingDto> {
    const { snacks, seats, ...booking } = createBookingDto;
    const bookedMovie = await this.databaseService.booking.create({
      select: {
        id: true,
        movie: { select: { name: true, category: true, duration: true } },
        member: { select: { name: true, email: true } },
        bookingDate: true,
        showTiming: true,
        price: true,
        theatre: {
          select: {
            name: true,
            city: true,
            location: true,
          },
        },
      },
      data: { ...booking, bookingDate: new Date() },
    });
    const bookSeats = seats.map((seat) => ({
      bookingId: bookedMovie.id,
      seatId: seat,
      showTiming: bookedMovie.showTiming,
    }));

    await this.databaseService.booking_Seat.createMany({
      data: bookSeats,
    });

    const bookedSeats = await this.databaseService.booking_Seat.findMany({
      where: { bookingId: bookedMovie.id },
      include: {
        seats: { select: { row: true, seatNumber: true, section: true } },
      },
    });

    let bookedSnacks = [];
    if (Array.isArray(snacks) && snacks.length > 0) {
      const bookSnacks = snacks.map((snack) => ({
        bookingId: bookedMovie.id,
        snackId: snack,
      }));

      await this.databaseService.booking_Snack.createMany({
        data: bookSnacks,
      });

      bookedSnacks = await this.databaseService.booking_Snack.findMany({
        where: { bookingId: bookedMovie.id },
        include: {
          snacks: { select: { name: true } },
        },
      });
    }

    return {
      ...bookedMovie,
      seats: bookedSeats.map((seat) => seat.seats),
      snacks: bookedSnacks.map((snack) => snack.snacks),
    };
  }

  getAllBookings() {
    return this.databaseService.booking.findMany();
  }

  getBookingsByMovieId(movieId: string) {
    return this.databaseService.booking.findMany({
      where: { movieId },
      select: {
        id: true,
        bookingDate: true,
        price: true,
        movie: { select: { id: true, name: true } },
        member: { select: { email: true, name: true } },
        theatre: { select: { name: true, city: true, location: true } },
      },
    });
  }

  getBookingsByTheatreId(theatreId: string) {
    return this.databaseService.booking.findMany({
      where: { theatreId },
    });
  }

  getBookingsByMemberId(memberId: string) {
    return this.databaseService.booking.findMany({
      where: { memberId },
    });
  }

  getBookingDetailsById(id: string) {
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
