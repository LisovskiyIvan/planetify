import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, UsersService, JwtService],
  imports: [UsersModule],
})
export class ProjectsModule {}
