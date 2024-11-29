import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  moviedId: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  theatreId: string;

  @IsDate()
  @IsNotEmpty()
  bookingDate: Date;
}
