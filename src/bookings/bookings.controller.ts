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
import { ApiBody } from '@nestjs/swagger';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  createBooking(@Body(ValidationPipe) createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }

  @Get()
  getAllBookings() {
    return this.bookingsService.getAllBookings();
  }

  @Get(':id')
  getBookingDetailsById(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingsService.getBookingDetailsById(id);
  }

  @Get(':movieId')
  getBookingsByMovieId(@Param('movieId', ParseUUIDPipe) movieId: string) {
    return this.bookingsService.getBookingsByMovieId(movieId);
  }

  @Get(':memberId')
  getBookingsByMemberId(@Param('memberId', ParseUUIDPipe) memberId: string) {
    this.bookingsService.getBookingsByMemberId(memberId);
  }

  @Get(':theatreId')
  //@ApiResponse({type:})
  getBookingsByTheatreId(@Param('theatreId', ParseUUIDPipe) theatreId: string) {
    this.bookingsService.getBookingsByTheatreId(theatreId);
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
