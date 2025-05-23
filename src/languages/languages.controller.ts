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
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseLanguageDto } from './dto/response-language.dto';
import { AutheGuard } from 'src/auth/guards/auth.guard';
import { member_roles } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiBody({ type: CreateLanguageDto })
  @ApiCreatedResponse({ type: ResponseLanguageDto })
  createLanguage(
    @Body(ValidationPipe) createLanguageDto: CreateLanguageDto,
  ): Promise<ResponseLanguageDto> {
    return this.languagesService.createLanguage(createLanguageDto);
  }

  @Get()
  @ApiOkResponse({ isArray: true, type: ResponseLanguageDto })
  getAllLanguages() {
    return this.languagesService.getAllLanguages();
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseLanguageDto })
  getLanguageById(@Param('id', ParseUUIDPipe) id: string) {
    return this.languagesService.getLanguageById(id);
  }

  @Patch(':id')
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiBody({ type: UpdateLanguageDto })
  @ApiOkResponse({ type: ResponseLanguageDto })
  updateLanguageById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languagesService.updateLanguageById(id, updateLanguageDto);
  }

  @Delete(':id')
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiOkResponse({ type: ResponseLanguageDto })
  removeLanguageById(@Param('id', ParseUUIDPipe) id: string) {
    return this.languagesService.removeLanguageById(id);
  }
}
