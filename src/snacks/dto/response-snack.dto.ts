import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { snack_categories, snack_types } from '@prisma/client';

export class ResponseSnackDto {
  @ApiProperty({ example: 'a0a0535f-3607-406e-8cfe-7543ea2f2eff' })
  id: string;

  @ApiProperty({ example: 'Popcorn' })
  name: string;

  @ApiProperty({ example: 110 })
  weight: number;

  @ApiProperty({ example: 25.2 })
  price: number;

  @ApiProperty({ example: 10 })
  quantity: number;

  @ApiProperty({ example: snack_categories.BEVERAGES })
  categories: snack_categories;

  @ApiProperty({ example: snack_types.VEG })
  type: snack_types;

  @ApiProperty({ example: '9c1eee8f-3c33-43b4-98cb-03dea058d731' })
  theatreId: string;
}

export class ResponseSnackDetailsDto extends OmitType(ResponseSnackDto, [
  'theatreId',
] as const) {}
