import { ApiProperty } from '@nestjs/swagger';

import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMemberDto {
  @IsAlpha()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  @ApiProperty({ example: 'JohnDoe' })
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'johndoe@mail.com' })
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({ example: 's0meComplexPa$$word' })
  password: string;
}
