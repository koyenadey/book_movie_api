import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MembersModule } from 'src/members/members.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { AutheGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    MembersModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, AutheGuard, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService, AutheGuard, RolesGuard],
})
export class AuthModule {}
