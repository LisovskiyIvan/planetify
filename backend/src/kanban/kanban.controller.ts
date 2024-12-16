import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { KanbanService } from './kanban.service';

@Controller('api/kanban')
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @UseGuards(AuthGuard)
  @Post('create-board')
  async createBoard(@Body() body: { title: string; authorId: number }) {
    return this.kanbanService.createBoard(body.title, body.authorId);
  }

  @UseGuards(AuthGuard)
  @Get(':userId/boards')
  async getBoards(@Param('userId') userId: number) {
    return this.kanbanService.getBoards(userId);
  }

  @UseGuards(AuthGuard)
  @Post('add-column')
  async addColumn(
    @Body()
    body: {
      boardId: number;
      title: string;
      position: number;
    },
  ) {
    return this.kanbanService.addColumn(
      body.boardId,
      body.title,
      body.position,
    );
  }

  @UseGuards(AuthGuard)
  @Post('add-task')
  async addTask(
    @Body()
    body: {
      columnId: number;
      title: string;
      description: string;
      position: number;
    },
  ) {
    return this.kanbanService.addTask(
      body.columnId,
      body.title,
      body.description,
      body.position,
    );
  }

  @UseGuards(AuthGuard)
  @Put('update-task/:id')
  async updateTask(
    @Param('id') id: number,
    @Body() body: { title?: string; description?: string; position?: number },
  ) {
    return this.kanbanService.updateTask(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete('delete-column/:id')
  async deleteColumn(@Param('id') id: number) {
    return this.kanbanService.deleteColumn(id);
  }

  @UseGuards(AuthGuard)
  @Delete('delete-task/:id')
  async deleteTask(@Param('id') id: number) {
    return this.kanbanService.deleteTask(id);
  }
}
