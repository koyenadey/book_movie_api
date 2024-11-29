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
  Query,
} from '@nestjs/common';
import { ScreensService } from './screens.service';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { OptionalUUIDPipe } from 'src/pipes/optionalUuidPipe.pipe';

@Controller('screens')
export class ScreensController {
  constructor(private readonly screensService: ScreensService) {}

  @Post()
  createScreen(@Body(ValidationPipe) createScreenDto: CreateScreenDto) {
    return this.screensService.createScreen(createScreenDto);
  }

  @Get()
  getAllScreens(@Query('theatreId', OptionalUUIDPipe) theatreId?: string) {
    return this.screensService.getAllScreens(theatreId);
  }

  @Get(':id')
  findScreenById(@Param('id', ParseUUIDPipe) id: string) {
    return this.screensService.findScreenById(id);
  }

  @Patch(':id')
  updateScreenById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateScreenDto: UpdateScreenDto,
  ) {
    return this.screensService.updateScreenById(id, updateScreenDto);
  }

  @Delete(':id')
  removeScreenById(@Param('id') id: string) {
    return this.screensService.removeScreenById(id);
  }
}
