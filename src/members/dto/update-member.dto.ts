import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 's0meComplexPa$$word' })
  password: string;
}
