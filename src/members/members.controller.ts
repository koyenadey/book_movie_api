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
  ParseUUIDPipe,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberRoles } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import {
  ResponseMemberDetailsDto,
  ResponseMemberDto,
} from './dto/response-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiBody({ type: CreateMemberDto })
  @ApiCreatedResponse({ type: ResponseMemberDto })
  createMember(
    @Body(ValidationPipe) createMemberDto: CreateMemberDto,
  ): Promise<ResponseMemberDto> {
    return this.membersService.createMember(createMemberDto);
  }

  @Get()
  @ApiOkResponse({ isArray: true, type: ResponseMemberDto })
  getAllMembers(
    @Query('role') role?: MemberRoles,
  ): Promise<ResponseMemberDto[]> {
    return this.membersService.getAllMembers(role);
  }

  @Get('profile')
  @ApiQuery({ required: true, name: 'email' })
  @ApiResponse({ type: ResponseMemberDto })
  getMemberProfile(@Query('email') emailId: string) {
    return this.membersService.getMemberProfile(emailId);
  }

  @Get(':id')
  @ApiResponse({ type: ResponseMemberDetailsDto })
  getMemberById(@Param('id', ParseUUIDPipe) id: string) {
    return this.membersService.getMemberById(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateMemberDto })
  @ApiResponse({ type: ResponseMemberDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateMemeberDto: UpdateMemberDto,
  ) {
    return this.membersService.updateMember(id, updateMemeberDto);
  }

  @Delete(':id')
  @ApiResponse({ type: ResponseMemberDetailsDto })
  deleteMember(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseMemberDetailsDto> {
    return this.membersService.deleteMember(id);
  }
}
