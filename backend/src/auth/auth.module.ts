import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, JwtService],
  imports: [JwtModule.register({secret: process.env.PRIVATE_KEY || "SECRET", signOptions: {expiresIn: '100d'}}), UsersModule],
  exports: [AuthGuard]
})
export class AuthModule {}
