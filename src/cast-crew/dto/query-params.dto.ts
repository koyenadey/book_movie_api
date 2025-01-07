import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { DEFAULT_PAGE_SIZE } from 'src/common/utils/constants';

export class CastQueryParamsDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  movieId?: string;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(DEFAULT_PAGE_SIZE)
  @ApiProperty({ required: false })
  limit?: number;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({ required: true, default: 1 })
  pageNo: number;
}
