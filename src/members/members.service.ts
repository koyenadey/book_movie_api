import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { DatabaseService } from 'src/database/database.service';
import { encryptPassword } from 'src/common/utils/hashPass';
import { Member, MemberRoles } from '@prisma/client';
import {
  ResponseMemberDetailsDto,
  ResponseMemberDto,
} from './dto/response-member.dto';

@Injectable()
export class MembersService {
  constructor(private readonly databaseService: DatabaseService) {}

  createMember(createMemberDto: CreateMemberDto): Promise<ResponseMemberDto> {
    const updated_password = encryptPassword(createMemberDto.password);
    createMemberDto.password = updated_password;
    return this.databaseService.member.create({
      data: { ...createMemberDto, role: MemberRoles.Customer },
    });
  }

  getAllMembers(role?: MemberRoles): Promise<ResponseMemberDto[]> {
    if (role)
      return this.databaseService.member.findMany({
        where: {
          role,
        },
      });
    return this.databaseService.member.findMany();
  }

  getMemberProfile(email: string): Promise<ResponseMemberDto> {
    return this.databaseService.member.findUnique({
      where: {
        email,
      },
    });
  }

  getMemberById(id: string): Promise<ResponseMemberDto> {
    return this.databaseService.member.findUnique({
      where: { id },
    });
  }

  updateMember(
    id: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<ResponseMemberDto> {
    return this.databaseService.member.update({
      where: { id },
      data: updateMemberDto,
    });
  }

  deleteMember(id: string): Promise<ResponseMemberDetailsDto> {
    return this.databaseService.member.delete({
      where: { id },
      include: {
        bookings: { select: { id: true, bookingDate: true } },
      },
    });
  }
}
