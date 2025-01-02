import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { DEFAULT_PAGE_SIZE } from 'src/common/utils/constants';

export class QueryParamsDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({ required: false })
  genreId?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsInt()
  @Min(1)
  @Max(DEFAULT_PAGE_SIZE)
  limit?: number;

  @IsInt()
  @ApiProperty({ required: true, default: 1 })
  @Min(1)
  pageNo: number;
}
