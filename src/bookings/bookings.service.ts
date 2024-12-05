import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { DatabaseService } from 'src/database/database.service';
import { Booking_Seat, Booking_Snack } from '@prisma/client';
import {
  BookedSnackType,
  ResponseBookingDto,
} from './dto/response-booking.dto';
import { BookedSnacksType } from 'src/type';

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

    //create records in booking_seat
    const bookSeats = seats.map((seat) => ({
      bookingId: bookedMovie.id,
      seatId: seat,
      showTiming: bookedMovie.showTiming,
    }));

    const bookedSeats =
      await this.databaseService.booking_Seat.createManyAndReturn({
        data: bookSeats,
        select: {
          seats: { select: { row: true, section: true, seatNumber: true } },
        },
      });

    //create records in Booking_Snack
    let bookedSnacks: BookedSnackType[];

    if (Array.isArray(snacks) && snacks.length > 0) {
      const bookSnacks = snacks.map((snack) => ({
        bookingId: bookedMovie.id,
        ...snack,
      }));

      bookedSnacks =
        await this.databaseService.booking_Snack.createManyAndReturn({
          data: bookSnacks,
          select: { qtyOrdered: true, snacks: { select: { name: true } } },
        });
    }

    return {
      ...bookedMovie,
      seatsBooked: bookedSeats,
      snacksOrdered: bookedSnacks,
    };
  }

  async getAllBookings(): Promise<ResponseBookingDto[]> {
    const bookings = await this.databaseService.booking.findMany({
      select: {
        id: true,
        bookingDate: true,
        price: true,
        showTiming: true,
        movie: { select: { name: true, category: true, duration: true } },
        member: { select: { email: true, name: true } },
        theatre: { select: { name: true, city: true, location: true } },
        seats: {
          select: {
            seats: { select: { row: true, section: true, seatNumber: true } },
          },
        },
        snacks: {
          select: {
            qtyOrdered: true,
            snacks: { select: { name: true } },
          },
        },
      },
    });
    return bookings.map(({ snacks, seats, ...booking }) => {
      return {
        ...booking,
        snacksOrdered: snacks,
        seatsBooked: seats,
      };
    });
  }

  async getBookingsByMovieId(movieId: string): Promise<ResponseBookingDto[]> {
    const bookingData = await this.databaseService.booking.findMany({
      where: { movieId },
      select: {
        id: true,
        bookingDate: true,
        price: true,
        showTiming: true,
        movie: { select: { name: true, category: true, duration: true } },
        member: { select: { email: true, name: true } },
        theatre: { select: { name: true, city: true, location: true } },
        seats: {
          select: {
            seats: { select: { row: true, section: true, seatNumber: true } },
          },
        },
        snacks: {
          select: {
            qtyOrdered: true,
            snacks: { select: { name: true } },
          },
        },
      },
    });
    return bookingData.map(({ snacks, seats, ...booking }) => {
      return {
        ...booking,
        snacksOrdered: snacks,
        seatsBooked: seats,
      };
    });
  }

  async getBookingsByTheatreId(
    theatreId: string,
  ): Promise<ResponseBookingDto[]> {
    const bookingData = await this.databaseService.booking.findMany({
      where: { theatreId },
      select: {
        id: true,
        bookingDate: true,
        price: true,
        showTiming: true,
        theatre: { select: { name: true, city: true, location: true } },
        movie: { select: { name: true, category: true, duration: true } },
        member: { select: { name: true, email: true } },
        seats: {
          select: {
            seats: { select: { row: true, section: true, seatNumber: true } },
          },
        },
        snacks: {
          select: {
            qtyOrdered: true,
            snacks: { select: { name: true } },
          },
        },
      },
    });
    return bookingData.map(({ snacks, seats, ...booking }) => {
      return {
        ...booking,
        snacksOrdered: snacks,
        seatsBooked: seats,
      };
    });
  }

  async getBookingsByMemberId(memberId: string): Promise<ResponseBookingDto[]> {
    const bookingData = await this.databaseService.booking.findMany({
      where: { memberId },
      select: {
        id: true,
        price: true,
        bookingDate: true,
        showTiming: true,
        member: { select: { name: true, email: true } },
        theatre: { select: { name: true, city: true, location: true } },
        movie: { select: { name: true, category: true, duration: true } },
        seats: {
          select: {
            seats: { select: { row: true, section: true, seatNumber: true } },
          },
        },
        snacks: {
          select: {
            qtyOrdered: true,
            snacks: { select: { name: true } },
          },
        },
      },
    });
    return bookingData.map(({ snacks, seats, ...booking }) => {
      return {
        ...booking,
        snacksOrdered: snacks,
        seatsBooked: seats,
      };
    });
  }

  async getBookingDetailsById(id: string): Promise<ResponseBookingDto> {
    const { snacks, seats, ...booking } =
      await this.databaseService.booking.findUnique({
        where: { id },
        select: {
          id: true,
          price: true,
          bookingDate: true,
          showTiming: true,
          movie: { select: { name: true, category: true, duration: true } },
          theatre: { select: { name: true, city: true, location: true } },
          member: { select: { name: true, email: true } },
          seats: {
            select: {
              seats: { select: { row: true, section: true, seatNumber: true } },
            },
          },
          snacks: {
            select: {
              qtyOrdered: true,
              snacks: { select: { name: true } },
            },
          },
        },
      });

    return {
      ...booking,
      snacksOrdered: snacks,
      seatsBooked: seats,
    };
  }

  async updateByBookingId(id: string, updateBookingDto: UpdateBookingDto) {
    //Check if the snacks is updated then update the booking snack table
    const newSnacks = updateBookingDto.snacks;
    if (newSnacks) {
      //First get all the snacks by that booking id //that will be an array
      const bookedSnacks = await this.getAllBookedSnacks(id);
      //Checking if the same snack is being added in newSnack
      const sameSnacks = bookedSnacks.filter((snack) =>
        newSnacks.some((newSnack) => newSnack.snackId === snack.snackId),
      );
      if (sameSnacks) {
        newSnacks.forEach((ssnack) => newSnacks.includes(ssnack));
      }
    }

    //Scenario : 1- Customer added nachos - means one more record needs to be created in junction table
    //Important is how data is coming, the only new one? so creation is required in junction
    //Price will be updated in Booking table

    //Scenario : 2- Customer deleted caramel popcorn 1 qty - means one record needs to be deleted from the junction table
    //Price will be updated in Booking table
  }

  getAllBookedSnacks(bookingId: string): Promise<BookedSnacksType[]> {
    return this.databaseService.booking_Snack.findMany({
      where: { bookingId },
    });
  }

  async deleteBookingById(id: string): Promise<ResponseBookingDto> {
    const { snacks, seats, ...deletedBooking } =
      await this.databaseService.booking.delete({
        where: { id },
        select: {
          id: true,
          price: true,
          bookingDate: true,
          showTiming: true,
          movie: { select: { name: true, category: true, duration: true } },
          theatre: { select: { name: true, city: true, location: true } },
          member: { select: { name: true, email: true } },
          seats: {
            select: {
              seats: { select: { row: true, section: true, seatNumber: true } },
            },
          },
          snacks: {
            select: {
              qtyOrdered: true,
              snacks: { select: { name: true } },
            },
          },
        },
      });
    return {
      ...deletedBooking,
      snacksOrdered: snacks,
      seatsBooked: seats,
    };
  }
}
