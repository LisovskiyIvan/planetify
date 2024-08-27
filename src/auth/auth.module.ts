import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [UsersModule, JwtModule.register({secret: process.env.PRIVATE_KEY || "SECRET", signOptions: {expiresIn: '24h'}})],
  exports: [AuthGuard]
})
export class AuthModule {}
