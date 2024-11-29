import {
  IsAlpha,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateScreenDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  title: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  capacity: number;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(2)
  @IsString()
  seatLayout: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  theatreId: string;
}
