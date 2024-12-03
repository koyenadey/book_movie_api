import { ApiProperty } from '@nestjs/swagger';
import { ResponseSnackDto } from 'src/snacks/dto/response-snack.dto';

export class ResponseTheatreDto {
  @ApiProperty({ example: 'a0a0535f-3607-406e-8cfe-7543ea2f2eff' })
  id: string;

  @ApiProperty({ example: 'Finland' })
  country: string;

  @ApiProperty({ example: 'Helsinki' })
  city: string;

  @ApiProperty({ example: 'Itäkatu 17' })
  location: string;
}

export class ResponseTheatreDetails extends ResponseTheatreDto {
  @ApiProperty()
  snacks: ResponseSnackDto[];
}
