import {
  IsAlpha,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateSnackDto {
  @IsAlpha()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  @Min(10)
  @Max(1000)
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  weight: number;

  @Min(5)
  @Max(50)
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  price: number;

  @Min(10)
  @Max(20)
  @IsInt()
  quantity: number;

  @IsAlpha()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  theatreId: string;
}
