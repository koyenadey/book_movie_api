import { ApiProperty } from '@nestjs/swagger';
import { seat_class } from '@prisma/client';

export type BookedSnackType = { qtyOrdered: number; snacks: { name: string } };

export class ResponseBookingDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  bookingDate: Date;

  @ApiProperty()
  price: number;

  @ApiProperty()
  showTiming: string;

  @ApiProperty()
  movie: { name: string; category: string; duration: string };

  @ApiProperty()
  member: { name: string; email: string };

  @ApiProperty()
  theatre: {
    name: string;
    city: string;
    location: string;
  };

  @ApiProperty()
  snacksOrdered: {
    qtyOrdered: number;
    snacks: { name: string };
  }[];

  @ApiProperty()
  seatsBooked: {
    seats: { row: number; section: seat_class; seatNumber: string };
  }[];
}
