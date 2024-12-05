import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { BookSnackType } from 'src/type';
export class UpdateBookingDto {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2,
  })
  @ApiProperty()
  price: number; //100.45

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  snacks?: BookSnackType[]; //19890187-ac36-4252-a931-afd45ba18fcb,c2b471e2-7809-4aac-83e8-3a66b5fd10cc

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  seats?: string[];
}
