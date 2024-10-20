import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaService } from './prisma.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [AuthModule, UsersModule, ProjectsModule, StatisticModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
