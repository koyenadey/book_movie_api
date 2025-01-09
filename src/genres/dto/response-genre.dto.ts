import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';

export class ResponseGenre {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}
export class ResponseGenreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseGenre)
  @ApiProperty({ isArray: true, type: ResponseGenre })
  genres: ResponseGenre[];

  @IsInt()
  @ApiProperty({ type: Number, default: 1 })
  count: number;
}
