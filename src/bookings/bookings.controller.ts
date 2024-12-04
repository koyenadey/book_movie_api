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
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseBookingDto } from './dto/response-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiBody({ type: CreateBookingDto })
  @ApiCreatedResponse({ type: ResponseBookingDto })
  createBooking(@Body(ValidationPipe) createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseBookingDto })
  getAllBookings() {
    return this.bookingsService.getAllBookings();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseBookingDto })
  getBookingDetailsById(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingsService.getBookingDetailsById(id);
  }

  @Get(':movieId')
  @ApiOkResponse({ type: ResponseBookingDto })
  getBookingsByMovieId(@Param('movieId', ParseUUIDPipe) movieId: string) {
    return this.bookingsService.getBookingsByMovieId(movieId);
  }

  @Get(':memberId')
  @ApiOkResponse({ type: ResponseBookingDto })
  getBookingsByMemberId(@Param('memberId', ParseUUIDPipe) memberId: string) {
    this.bookingsService.getBookingsByMemberId(memberId);
  }

  @Get(':theatreId')
  @ApiOkResponse({ type: ResponseBookingDto })
  getBookingsByTheatreId(@Param('theatreId', ParseUUIDPipe) theatreId: string) {
    this.bookingsService.getBookingsByTheatreId(theatreId);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateBookingDto })
  @ApiOkResponse({ type: ResponseBookingDto })
  updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingsService.updateById(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseBookingDto })
  deleteBookingById(@Param('id') id: string) {
    return this.bookingsService.deleteBookingById(id);
  }
}
