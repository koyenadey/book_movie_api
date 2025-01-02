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
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { member_roles } from '@prisma/client';
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
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AutheGuard } from 'src/auth/guards/auth.guard';

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
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiOkResponse({ isArray: true, type: ResponseMemberDto })
  getAllMembers(
    @Query('role') role?: member_roles,
  ): Promise<ResponseMemberDto[]> {
    return this.membersService.getAllMembers(role);
  }

  @Get('profile')
  @UseGuards(AutheGuard)
  @ApiQuery({ required: true, name: 'email' })
  @ApiResponse({ type: ResponseMemberDto })
  getMemberProfile(
    @Request() req: { email: string; role: member_roles },
    @Query('email') emailId: string,
  ) {
    if (req.role !== member_roles.Admin && req.email !== emailId)
      throw new UnauthorizedException(
        "You are not authorized to access other's data!",
      );
    return this.membersService.getMemberProfile(emailId);
  }

  @Get(':id')
  @UseGuards(AutheGuard, RolesGuard)
  @Roles(member_roles.Admin)
  @ApiResponse({ type: ResponseMemberDetailsDto })
  getMemberById(@Param('id', ParseUUIDPipe) id: string) {
    return this.membersService.getMemberById(id);
  }

  @Patch(':id')
  @UseGuards(AutheGuard)
  @ApiBody({ type: UpdateMemberDto })
  @ApiResponse({ type: ResponseMemberDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateMemberDto: UpdateMemberDto,
  ) {
    return this.membersService.updateMember(id, updateMemberDto);
  }

  @Delete(':id')
  @UseGuards(AutheGuard)
  @ApiResponse({ type: ResponseMemberDetailsDto })
  deleteMember(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseMemberDetailsDto> {
    return this.membersService.deleteMember(id);
  }
}
