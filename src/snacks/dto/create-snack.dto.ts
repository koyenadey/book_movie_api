import {
  IsAlpha,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

enum SnackCategories {
  Bites = 'BITES',
  Beverages = 'BEVERAGES',
  Desser = 'DESSERT',
  Combo = 'COMBO',
  Popcorn = 'POPCORN',
}

enum SnackTypes {
  veg = 'VEG',
  non_veg = 'NON_VEG',
}

export class CreateSnackDto {
  @IsAlpha()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  @Min(10)
  @Max(1000)
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  weight: number;

  @Min(5)
  @Max(50)
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  price: number;

  @Min(10)
  @Max(20)
  @IsInt()
  quantity: number;

  @IsAlpha()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  theatreId: string;

  @IsEnum(SnackCategories)
  @IsNotEmpty()
  @IsString()
  categories: SnackCategories;

  @IsEnum(SnackTypes)
  @IsNotEmpty()
  @IsString()
  type: SnackTypes;
}
