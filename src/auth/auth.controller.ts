import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateMemberDto } from 'src/members/dto/create-member.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { ResponseLoginDto } from './dto/response-login.dto';
import { ResponseRegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: ResponseLoginDto })
  login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiBody({ type: CreateMemberDto })
  @ApiCreatedResponse({ type: ResponseRegisterDto })
  register(
    @Body(ValidationPipe) registerDto: CreateMemberDto,
  ): Promise<ResponseRegisterDto> {
    return this.authService.register(registerDto);
  }
}
