import { ApiProperty } from '@nestjs/swagger';

export class ResponseCastDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  imageUrl: string;
}
