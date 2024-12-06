import { ApiProperty } from '@nestjs/swagger';

export class ResponseLanguageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  code: string;
}
