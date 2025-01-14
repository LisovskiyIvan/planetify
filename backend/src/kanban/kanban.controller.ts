import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { KanbanService } from './kanban.service';

@Controller('kanban')
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @UseGuards(AuthGuard)
  @Post('create-board')
  async createBoard(@Body() body: { title: string; authorId: number }) {
    return this.kanbanService.createBoard(body.title, body.authorId);
  }

  @UseGuards(AuthGuard)
  @Get(':userId/boards')
  async getBoards(@Param('userId') userId: string) {
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
      columnId: string;
      title: string;
      description: string;
      position: string;
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
    @Param('id') id: string,
    @Body()
    body: {
      title?: string;
      description?: string;
      position?: number;
      columnId?: number;
    },
  ) {
    return this.kanbanService.updateTask(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete('delete-board/:id')
  async deleteBoard(@Param('id') id: string) {
    return this.kanbanService.deleteBoard(id);
  }

  @UseGuards(AuthGuard)
  @Delete('delete-column/:id')
  async deleteColumn(@Param('id') id: string) {
    return this.kanbanService.deleteColumn(id);
  }

  @UseGuards(AuthGuard)
  @Delete('delete-task/:id')
  async deleteTask(@Param('id') id: string) {
    return this.kanbanService.deleteTask(id);
  }

  // --- Статистика ---
  @UseGuards(AuthGuard)
  @Get('stats/:userId')
  async getStats(@Param('userId') userId: string, @Query('days') days: string) {
    if (!userId) {
      return {
        boardsCount: { count: 0 },
        averageColumns: { average: 0 },
        averageTasks: { average: 0 },
        topColumns: [],
        taskCreation: {},
        userActivity: { tasksCount: 0, projectsCount: 0 },
      };
    }

    const [
      boardsCount,
      averageColumns,
      averageTasks,
      topColumns,
      taskCreation,
      userActivity,
    ] = await Promise.all([
      this.kanbanService.getKanbanBoardsCount(Number(userId)),
      this.kanbanService.getAverageColumnsPerBoard(Number(userId)),
      this.kanbanService.getAverageTasksPerColumn(Number(userId)),
      this.kanbanService.getTopColumnsByTasks(Number(userId)),
      this.kanbanService.getTaskCreationStats(Number(userId)),
      this.kanbanService.getUserActivity(Number(userId), Number(days) || 7),
    ]);

    return {
      boardsCount: { count: boardsCount ?? 0 },
      averageColumns: { average: averageColumns ?? 0 },
      averageTasks: { average: averageTasks ?? 0 },
      topColumns: topColumns ?? [],
      taskCreation: taskCreation ?? {},
      userActivity: userActivity ?? { tasksCount: 0, projectsCount: 0 },
    };
  }
}
