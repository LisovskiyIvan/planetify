import { Module } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { KanbanController } from './kanban.controller';
import { PrismaService } from '../prisma.service';
@Module({
  providers: [KanbanService],
  controllers: [KanbanController],
  imports: [PrismaService],
})
export class KanbanModule {}
