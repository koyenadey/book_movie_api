import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberRoles } from '@prisma/client';

@Controller('members')
export class MembersController {
  constructor(private readonly memebersService: MembersService) {}

  @Post()
  createMember(@Body(ValidationPipe) createMemeberDto: CreateMemberDto) {
    return this.memebersService.createMember(createMemeberDto);
  }

  @Get()
  getAllMembers(@Query('role') role?: MemberRoles) {
    return this.memebersService.getAllMembers(role);
  }

  @Get(':id')
  getMemberById(@Param('id') id: string) {
    return this.memebersService.getMemberById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemeberDto: UpdateMemberDto) {
    return this.memebersService.update(+id, updateMemeberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memebersService.remove(+id);
  }
}
