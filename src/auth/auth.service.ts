import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ResponseLoginDto } from './dto/response-login.dto';
import { LoginDto } from './dto/login.dto';
import { CreateMemberDto } from 'src/members/dto/create-member.dto';
import { MembersService } from 'src/members/members.service';
import { comparePassword } from 'src/common/utils/hashPass';
import { JwtService } from '@nestjs/jwt';
import { ResponseMemberDto } from 'src/members/dto/response-member.dto';
import { ResponseRegisterDto } from './dto/register.dto';
import { MemberRoles } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberService: MembersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseLoginDto> {
    const memberToFind: ResponseMemberDto =
      await this.memberService.getMemberProfile(loginDto.email);
    if (!memberToFind)
      throw new UnauthorizedException('The member does not exist.');
    //Compare the password
    const checkPassword = comparePassword(
      loginDto.password,
      memberToFind.password,
    );
    //If matches then create a token
    if (checkPassword) {
      const accessToken = await this.generateToken(
        memberToFind.email,
        memberToFind.role,
      );
      const member = this.transformMember(memberToFind);

      return {
        token: accessToken,
        ...member,
      };
    }
    throw new BadRequestException('Passwords do not match');
  }

  async generateToken(email: string, role: MemberRoles) {
    const payload = { sub: email, role };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  transformMember(memberObj: ResponseMemberDto) {
    return {
      id: memberObj.id,
      name: memberObj.name,
      email: memberObj.email,
      role: memberObj.role,
    };
  }

  async register(registerDto: CreateMemberDto): Promise<ResponseRegisterDto> {
    const { password, ...registerMember } =
      await this.memberService.createMember(registerDto);
    return registerMember;
  }
}
