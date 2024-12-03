import { ApiProperty } from '@nestjs/swagger';

export class ResponsePictureQuality {
  @ApiProperty({ example: 'a0a0535f-3607-406e-8cfe-7543ea2f2eff' })
  id: string;

  @ApiProperty({ example: 'IMAX-3D' })
  title: string;
}
