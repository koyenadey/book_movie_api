import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token: string = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException();

    try {
      //Validate the token from JwtService
      const payload = await this.jwtService.verifyAsync(token);

      //If yes then add something more to headers so that it could be consumed later in apis
      request['user'] = payload;
      return true;
    } catch (error: any) {
      console.log(error.message);
      throw new UnauthorizedException();
    }
  }
}
