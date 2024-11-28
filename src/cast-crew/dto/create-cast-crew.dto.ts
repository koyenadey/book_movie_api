import {
  IsAlpha,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCastCrewDto {
  @IsAlpha()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  name: string;

  @IsAlpha()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @IsUrl()
  imageUrl: string;
}
