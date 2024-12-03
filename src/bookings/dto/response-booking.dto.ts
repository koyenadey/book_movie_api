import { ApiProperty } from '@nestjs/swagger';
import { SeatClass } from '@prisma/client';

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
  snacks: { name: string }[];

  @ApiProperty()
  seats: { row: number; seatNumber: string; section: SeatClass }[];
}
