import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
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
import { MembersController } from 'src/members/members.controller';

type MemberError = {
  status: HttpStatus;
  message: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly memberService: MembersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseLoginDto> {
    const memberToFind: ResponseMemberDto | MemberError =
      await this.validateUser(loginDto.email, loginDto.password);

    if (this.isMemberError(memberToFind))
      throw new HttpException(memberToFind.message, memberToFind.status);

    const accessToken = await this.generateToken(
      memberToFind.email,
      memberToFind.role,
    );

    return {
      token: accessToken,
      ...memberToFind,
    };
  }

  isMemberError(obj: any): obj is MemberError {
    return 'status' in obj && 'message' in obj;
  }

  async validateUser(
    dtoEmail: string,
    dtoPassword?: string,
  ): Promise<ResponseMemberDto | MemberError> {
    const userToFind: ResponseMemberDto =
      await this.memberService.getMemberProfile(dtoEmail);
    if (!userToFind)
      return { status: HttpStatus.NOT_FOUND, message: 'User does not exist' };

    if (dtoPassword) {
      const passwordIsValid = comparePassword(dtoPassword, userToFind.password);
      if (!passwordIsValid)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Password does not match',
        };
    }
    return userToFind;
  }

  async generateToken(email: string, role: MemberRoles) {
    const payload = { sub: email, role };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async register(registerDto: CreateMemberDto): Promise<ResponseRegisterDto> {
    const { password, ...registerMember } =
      await this.memberService.createMember(registerDto);
    return registerMember;
  }
}
