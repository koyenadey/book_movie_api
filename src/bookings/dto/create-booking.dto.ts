import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @ApiProperty()
  movieId: string; //6dc9edf7-1c03-48eb-8fdf-1acc193eea01

  @IsUUID()
  @ApiProperty()
  memberId: string; //0599d0ad-1053-4a03-bd0b-fee7938f66ee

  @IsUUID()
  @ApiProperty()
  theatreId: string; //3f244730-b824-4da9-8291-58225828699c

  @IsUUID()
  @ApiProperty()
  screenId: string; //4b22d774-1b18-4a57-bd06-8fdd26822de7

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  snacks?: string[]; //19890187-ac36-4252-a931-afd45ba18fcb,c2b471e2-7809-4aac-83e8-3a66b5fd10cc

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  seats: string[]; //f21b8eee-2323-43c4-83c7-ddbd7a1c0f07,9301a370-8be0-4e2a-a3e7-dfcaf18cf44f

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2,
  })
  @ApiProperty()
  price: number; //100.45

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  showTiming: string; //10:00
}
