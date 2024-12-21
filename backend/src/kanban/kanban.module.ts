import { Module } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { KanbanController } from './kanban.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [KanbanService, PrismaService, JwtService],
  controllers: [KanbanController],
  imports: [],
})
export class KanbanModule {}
