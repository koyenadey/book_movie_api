import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { OptionalUUIDPipe } from 'src/pipes/optionalUuidPipe.pipe';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  createBooking(@Body(ValidationPipe) createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }

  @Get()
  getAllBookings(
    @Query('movieId', OptionalUUIDPipe) movieId?: string,
    @Query('memberId', OptionalUUIDPipe) memberId?: string,
    @Query('theatreId', OptionalUUIDPipe) theatreId?: string,
  ) {
    return this.bookingsService.getAllBookings(movieId, memberId, theatreId);
  }

  @Get(':id')
  getDetailsById(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingsService.getDetailsById(id);
  }

  @Patch(':id')
  updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingsService.updateById(id, updateBookingDto);
  }

  @Delete(':id')
  deleteBookingById(@Param('id') id: string) {
    return this.bookingsService.deleteBookingById(id);
  }
}
