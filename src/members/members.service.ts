import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { DatabaseService } from 'src/database/database.service';
import { encryptPassword } from 'src/utils/hashPass';
import { MemberRoles } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(private readonly databaseService: DatabaseService) {}

  createMember(createMemberDto: CreateMemberDto) {
    const updated_password = encryptPassword(createMemberDto.password);
    console.log(updated_password);
    createMemberDto.password = updated_password;
    return this.databaseService.member.create({
      select: {
        id: true,
        name: true,
        password: true,
        role: true,
      },
      data: createMemberDto,
    });
  }

  getAllMembers(role?: MemberRoles) {
    if (role)
      return this.databaseService.member.findMany({
        where: {
          role,
        },
      });
    return this.databaseService.member.findMany();
  }

  getMemberById(id: string) {
    return this.databaseService.member.findUnique({
      select: {
        id: true,
        name: true,
        password: true,
        role: true,
      },
      where: { id },
    });
  }

  update(id: number, updateMemeberDto: UpdateMemberDto) {
    return `This action updates a #${id} memeber`;
  }

  remove(id: number) {
    return `This action removes a #${id} memeber`;
  }
}
