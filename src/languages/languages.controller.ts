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
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { ResponseLanguageDto } from './dto/response-language.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { MemberRoles } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(MemberRoles.Admin)
  @ApiBody({ type: CreateLanguageDto })
  @ApiCreatedResponse({ type: ResponseLanguageDto })
  createLanguage(
    @Body(ValidationPipe) createLanguageDto: CreateLanguageDto,
  ): Promise<ResponseLanguageDto> {
    return this.languagesService.createLanguage(createLanguageDto);
  }

  @Get()
  getAllLanguages() {
    return this.languagesService.getAllLanguages();
  }

  @Get(':id')
  getLanguageById(@Param('id', ParseUUIDPipe) id: string) {
    return this.languagesService.getLanguageById(id);
  }

  @Patch(':id')
  updateLanguageById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languagesService.updateLanguageById(id, updateLanguageDto);
  }

  @Delete(':id')
  removeLanguageById(@Param('id', ParseUUIDPipe) id: string) {
    return this.languagesService.removeLanguageById(id);
  }
}
