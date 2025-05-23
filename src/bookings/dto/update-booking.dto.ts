import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
//import { BookSnackType } from 'src/type';

export class BookSnackType {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsUUID()
  @ApiProperty()
  snackId: string;

  @IsNumber()
  @Min(1)
  @ApiProperty()
  qtyOrdered: number;
}
export class UpdateBookingDto {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2,
  })
  @Min(1)
  @ApiProperty()
  price: number; //100.45

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookSnackType)
  @ApiProperty({ type: [BookSnackType], required: false })
  snacks: BookSnackType[];
}
