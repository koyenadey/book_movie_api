import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTheatreDto } from './create-theatre.dto';
import {
  IsAlpha,
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTheatreDto extends PartialType(CreateTheatreDto) {
  @IsAlpha()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({ example: 'ITIS' })
  name?: string;

  @IsAlpha()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({ example: 'Finland' })
  country?: string;

  @IsAlpha()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @ApiProperty({ example: 'Helsinki' })
  city?: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ example: 'Itäkatu 17' })
  location?: string;
}
