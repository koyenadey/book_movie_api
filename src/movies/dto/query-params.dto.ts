import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { DEFAULT_PAGE_SIZE } from 'src/common/utils/constants';

export class QueryParamsDto {
  @IsOptional()
  @IsUUID()
  genreId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(DEFAULT_PAGE_SIZE)
  limit?: number;

  @IsInt()
  @Min(1)
  pageNo: number;
}
