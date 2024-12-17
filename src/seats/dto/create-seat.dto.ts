import { ApiProperty } from '@nestjs/swagger';
import { seat_class } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateSeatDto {
  @IsNumber()
  @Min(1)
  @Max(100)
  @ApiProperty()
  row: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  @ApiProperty()
  section: seat_class;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  @ApiProperty()
  seatNumber: string;

  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(10)
  @Max(500)
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty()
  screenId: string;
}
