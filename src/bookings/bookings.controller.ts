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
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseBookingDto } from './dto/response-booking.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { MemberRoles } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { ActionPermissions } from 'src/common/type';

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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(MemberRoles.Admin)
  @ApiOkResponse({ isArray: true, type: ResponseBookingDto })
  getAllBookings() {
    return this.bookingsService.getAllBookings();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: ResponseBookingDto })
  getBookingDetailsById(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingsService.getBookingDetailsById(id);
  }

  @Get(':movieId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(MemberRoles.Admin)
  @ApiOkResponse({ type: ResponseBookingDto })
  getBookingsByMovieId(@Param('movieId', ParseUUIDPipe) movieId: string) {
    return this.bookingsService.getBookingsByMovieId(movieId);
  }

  @Get(':memberId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(MemberRoles.Admin)
  @ApiOkResponse({ type: ResponseBookingDto })
  getBookingsByMemberId(@Param('memberId', ParseUUIDPipe) memberId: string) {
    this.bookingsService.getBookingsByMemberId(memberId);
  }

  @Get(':theatreId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(MemberRoles.Admin)
  @ApiOkResponse({ type: ResponseBookingDto })
  getBookingsByTheatreId(@Param('theatreId', ParseUUIDPipe) theatreId: string) {
    this.bookingsService.getBookingsByTheatreId(theatreId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(MemberRoles.Admin)
  @ApiBody({ type: UpdateBookingDto })
  @ApiOkResponse({ type: ResponseBookingDto })
  updateByBookingId(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingsService.updateByBookingId(id, updateBookingDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(MemberRoles.Admin)
  @ApiOkResponse({ type: ResponseBookingDto })
  deleteBookingById(@Param('id') id: string) {
    return this.bookingsService.deleteBookingById(id);
  }
}
