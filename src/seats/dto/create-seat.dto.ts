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

enum SeatClass {
  Gold = 'GOLD',
  Platinum = 'PLATINUM',
  Silver = 'SILVER',
  Balcony = 'BALCONY',
  Recliner = 'RECLINER',
  Premium = 'PREMIUM',
  Economy = 'ECONOMY',
}

export class CreateSeatDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  title: SeatClass;

  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(10)
  @Max(500)
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  screenId: string;
}
