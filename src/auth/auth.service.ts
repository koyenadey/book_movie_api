import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

type AuthInput = { email: string; password: string };
type AuthOutput = { userId: string; userRole: string; email: string };
type AuthResult = {
  accessToken: string;
  userId: string;
  role: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const foundUser = await this.validateUser(input);

    if (!foundUser) throw new UnauthorizedException();

    return this.signIn({
      userId: foundUser.userId,
      userRole: foundUser.userRole,
      email: foundUser.email,
    });
  }

  async validateUser(input: AuthInput): Promise<AuthOutput | null> {
    const foundUser = await this.usersService.findUser(input.email);
    if (foundUser && foundUser.password === input.password) {
      return {
        userId: foundUser.id,
        userRole: foundUser.role,
        email: foundUser.email,
      };
    }
    return null;
  }

  async signIn(user: AuthOutput): Promise<AuthResult> {
    const payload = {
      sub: user.email,
      role: user.userRole,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
      userId: user.userId,
      role: user.userRole,
      email: user.email,
    };
  }
}
