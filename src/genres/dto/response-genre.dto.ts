import { ApiProperty } from '@nestjs/swagger';

export class ResponseGenreDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}
