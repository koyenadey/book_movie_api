import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { DatabaseService } from 'src/database/database.service';
import { Language } from 'src/type';

@Injectable()
export class LanguagesService {
  constructor(private readonly databaseService: DatabaseService) {}

  createLanguage(createLanguageDto: CreateLanguageDto) {
    return this.databaseService.language.create({
      data: createLanguageDto,
    });
  }

  getAllLanguages() {
    return this.databaseService.language.findMany();
  }

  getLanguageById(id: string) {
    return this.databaseService.language.findUnique({
      where: {
        id,
      },
    });
  }

  updateLanguageById(id: string, updateLanguageDto: UpdateLanguageDto) {
    return this.databaseService.language.update({
      where: {
        id,
      },
      data: updateLanguageDto,
    });
  }

  removeLanguageById(id: string) {
    return this.databaseService.language.delete({
      where: {
        id,
      },
    });
  }
}
