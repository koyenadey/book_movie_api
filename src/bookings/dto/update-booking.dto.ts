import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateBookingDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  moviedId: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  bookingDate: Date;
}
