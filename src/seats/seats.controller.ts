import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
  createSeats(@Body(ValidationPipe) createSeatDto: CreateSeatDto) {
    return this.seatsService.createSeats(createSeatDto);
  }

  @Get()
  getAllSeats(@Param('screenId', ParseUUIDPipe) screenId?: string) {
    return this.seatsService.getAllSeats();
  }

  @Get(':id')
  getSeatById(@Param('id', ParseUUIDPipe) id: string) {
    return this.seatsService.getSeatDetailsById(id);
  }

  @Patch(':id')
  updateSeatsById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateSeatDto: UpdateSeatDto,
  ) {
    return this.seatsService.updateSeatsById(id, updateSeatDto);
  }

  @Delete(':id')
  deletSeatById(@Param('id', ParseUUIDPipe) id: string) {
    return this.seatsService.deletSeatById(id);
  }
}
