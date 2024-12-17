import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookSnackType, UpdateBookingDto } from './dto/update-booking.dto';
import { DatabaseService } from 'src/database/database.service';
import {
  BookedSnackType,
  ResponseBookingDto,
} from './dto/response-booking.dto';

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
      await this.databaseService.booking_seat.createManyAndReturn({
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
        await this.databaseService.booking_snack.createManyAndReturn({
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
    const { snacks: newSnacks, price } = updateBookingDto;

    if (!newSnacks && !price)
      throw new BadRequestException(
        'Provide at least snacks,and price to update',
      );

    //Fetch existing booking
    const {
      snacks: existingSnacks,
      seats: existingSeats,
      movie,
      ...existingBooking
    } = await this.databaseService.booking.findUnique({
      where: {
        id,
      },
      include: {
        seats: true,
        snacks: true,
        movie: true,
      },
    });

    //Compare the existing snacks with new one to add or update
    const snacksToAdd = newSnacks.filter(
      (nSnack) =>
        !existingSnacks.some((eSnack) => eSnack.snackId === nSnack.snackId),
    );

    const snacksToUpdate = newSnacks.filter((nSnack) =>
      existingSnacks.some(
        (eSnack) =>
          eSnack.snackId === nSnack.snackId &&
          eSnack.qtyOrdered !== nSnack.qtyOrdered,
      ),
    );

    if (newSnacks && newSnacks.length > 0) {
      if (snacksToAdd && snacksToAdd.length > 0) {
        await this.getAddedSnacksData(id, snacksToAdd);
      }
      if (snacksToUpdate && snacksToUpdate.length > 0) {
        await this.getUpdatedSnacksData(snacksToUpdate, id);
      }
    }
    return this.databaseService.booking.findUnique({
      where: { id },
      select: {
        id: true,
        price: true,
        showTiming: true,
        bookingDate: true,
        member: { select: { email: true, name: true } },
        movie: { select: { name: true, category: true, duration: true } },
        seats: {
          select: {
            seats: { select: { row: true, section: true, seatNumber: true } },
          },
        },
        snacks: {
          select: { snacks: { select: { name: true } }, qtyOrdered: true },
        },
      },
    });
  }

  async getUpdatedSnacksData(snacksToUpdate: BookSnackType[], bookingId) {
    for (const nSnack of snacksToUpdate) {
      const { snacks: updatedSnacks, ...updatedBooking } =
        await this.databaseService.booking.update({
          where: { id: bookingId },
          data: {
            snacks: {
              update: {
                where: { id: nSnack.id },
                data: { qtyOrdered: nSnack.qtyOrdered },
              },
            },
          },
          include: { snacks: true },
        });
    }
  }

  async getAddedSnacksData(bookingId, snacksToAdd) {
    const { snacks: addedSnacks, ...addedBooking } =
      await this.databaseService.booking.update({
        where: { id: bookingId },
        data: {
          snacks: {
            createMany: {
              data: snacksToAdd,
            },
          },
        },
        include: {
          snacks: true,
        },
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
