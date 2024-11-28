import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SnacksService } from './snacks.service';
import { CreateSnackDto } from './dto/create-snack.dto';
import { UpdateSnackDto } from './dto/update-snack.dto';
import { threadId } from 'worker_threads';

@Controller('snacks')
export class SnacksController {
  constructor(private readonly snacksService: SnacksService) {}

  @Post()
  CreateSnack(@Body() createSnackDto: CreateSnackDto) {
    return this.snacksService.CreateSnack(createSnackDto);
  }

  @Get()
  getAllSnacks(@Param('theaterId', ParseUUIDPipe) theatreId?: string) {
    return this.snacksService.getAllSnacks(theatreId);
  }

  @Get(':id')
  getSnackDetailsById(@Param('id', ParseUUIDPipe) id: string) {
    return this.snacksService.getSnackDetailsById(id);
  }

  @Patch(':id')
  updateSnackById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateSnackDto: UpdateSnackDto,
  ) {
    return this.snacksService.updateSnackById(id, updateSnackDto);
  }

  @Delete(':id')
  deletSnackById(@Param('id', ParseUUIDPipe) id: string) {
    return this.snacksService.deletSnackById(id);
  }
}
