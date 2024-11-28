import {
  IsAlpha,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateLanguageDto {
  @IsAlpha()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(25)
  title: string;

  @IsAlpha()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  code: string;
}
