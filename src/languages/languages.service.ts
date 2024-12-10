import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { DatabaseService } from 'src/database/database.service';
import { Language } from 'src/common/type';
import { ResponseLanguageDto } from './dto/response-language.dto';

@Injectable()
export class LanguagesService {
  constructor(private readonly databaseService: DatabaseService) {}

  createLanguage(
    createLanguageDto: CreateLanguageDto,
  ): Promise<ResponseLanguageDto> {
    return this.databaseService.language.create({
      data: createLanguageDto,
    });
  }

  getAllLanguages(): Promise<ResponseLanguageDto[]> {
    return this.databaseService.language.findMany();
  }

  getLanguageById(id: string): Promise<ResponseLanguageDto> {
    return this.databaseService.language.findUnique({
      where: {
        id,
      },
    });
  }

  updateLanguageById(
    id: string,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<ResponseLanguageDto> {
    return this.databaseService.language.update({
      where: {
        id,
      },
      data: updateLanguageDto,
    });
  }

  removeLanguageById(id: string): Promise<ResponseLanguageDto> {
    return this.databaseService.language.delete({
      where: {
        id,
      },
    });
  }
}
