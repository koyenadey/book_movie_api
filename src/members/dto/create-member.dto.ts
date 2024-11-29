import { MemberRoles } from '@prisma/client';
import {
  IS_STRONG_PASSWORD,
  IsAlpha,
  IsEmail,
  IsEnum,
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
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsEnum(MemberRoles)
  @IsNotEmpty()
  @IsString()
  role: MemberRoles;
}
