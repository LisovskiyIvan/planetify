import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ProjectsService } from 'src/projects/projects.service';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService, JwtService, PrismaService, UsersService, ProjectsService],
  imports: [UsersModule, ProjectsModule]
})
export class StatisticModule {}
