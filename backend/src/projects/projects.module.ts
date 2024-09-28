import { Module } from '@nestjs/common';
import { PostsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PostsController],
  providers: [ProjectsService, PrismaService, JwtService]
})
export class ProjectsModule {}
