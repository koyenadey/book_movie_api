import { PartialType } from '@nestjs/mapped-types';
import { CreateCastCrewDto } from './create-cast-crew.dto';

export class UpdateCastCrewDto extends PartialType(CreateCastCrewDto) {}
