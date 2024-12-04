import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCastCrewDto {
  @IsAlpha('en-US', { message: 'The name should only contain alphabets' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty()
  imageUrl: string;
}
