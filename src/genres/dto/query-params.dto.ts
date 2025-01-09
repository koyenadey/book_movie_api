import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { DEFAULT_PAGE_SIZE } from 'src/common/utils/constants';

export class GenreQueryParamsDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ type: Number, default: 1 })
  @Type(() => Number)
  pageNo: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  @Min(1)
  @Max(DEFAULT_PAGE_SIZE)
  @Type(() => Number)
  limit: number;
}
