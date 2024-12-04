import { ApiProperty } from '@nestjs/swagger';
import { SeatClass } from '@prisma/client';

export type BookedSnackType = { qtyOrdered: number; snacks: { name: string } };

export class ResponseBookingDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  bookingDate: Date;

  @ApiProperty()
  price: number;

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
  showTiming: string;

  @ApiProperty()
  snacksOrdered: { qtyOrdered: number; snacks: { name: string } }[];

  @ApiProperty()
  seatsBooked: {
    seats: { row: number; section: SeatClass; seatNumber: string };
  }[];
}
