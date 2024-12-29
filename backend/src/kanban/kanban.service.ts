import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class KanbanService {
  constructor(private readonly prisma: PrismaService) {}

  async createBoard(title: string, authorId: number) {
    return await this.prisma.kanbanBoard.create({
      data: {
        title,
        authorId,
      },
    });
  }

  // Получить все доски пользователя
  async getBoards(userId: string) {
    return await this.prisma.kanbanBoard.findMany({
      where: { authorId: parseInt(userId) },
      include: { columns: { include: { tasks: true } } },
    });
  }

  // Добавить колонку на доску
  async addColumn(boardId: number, title: string, position: number) {
    return await this.prisma.kanbanColumn.create({
      data: {
        boardId,
        title,
        position,
      },
    });
  }

  async addTask(
    columnId: string,
    title: string,
    description: string,
    position: string,
  ) {
    return await this.prisma.kanbanTask.create({
      data: {
        columnId: parseInt(columnId),
        title,
        description,
        position: parseInt(position),
      },
    });
  }

  // Обновить задачу
  async updateTask(
    id: string,
    data: {
      title?: string;
      description?: string;
      position?: number;
      columnId?: number;
    },
  ) {
    return await this.prisma.kanbanTask.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteBoard(id: string) {
    return await this.prisma.kanbanBoard.delete({
      where: { id: parseInt(id) },
    });
  }
  // Удалить колонку
  async deleteColumn(id: string) {
    return await this.prisma.kanbanColumn.delete({
      where: { id: parseInt(id) },
    });
  }

  // Удалить задачу
  async deleteTask(id: string) {
    const taskId = parseInt(id);
    return await this.prisma.kanbanTask.delete({
      where: { id: taskId },
    });
  }

  async getKanbanBoardsCount(userId: number) {
    if (!userId) return 0;
    const count = await this.prisma.kanbanBoard.count({
      where: {
        authorId: userId,
      },
    });
    return count;
  }

  async getAverageColumnsPerBoard(userId: number) {
    if (!userId) return 0;
    const boards = await this.prisma.kanbanBoard.findMany({
      where: { authorId: userId },
      include: {
        columns: true,
      },
    });
    if (!boards || !boards.length) return 0;
    const totalColumns = boards.reduce(
      (sum, board) => sum + (board?.columns?.length || 0),
      0,
    );
    const average = totalColumns / boards.length;
    return average;
  }

  async getAverageTasksPerColumn(userId: number) {
    if (!userId) return 0;
    const columns = await this.prisma.kanbanColumn.findMany({
      where: {
        board: {
          authorId: userId,
        },
      },
      include: {
        tasks: true,
      },
    });
    if (!columns || !columns.length) return 0;
    const totalTasks = columns.reduce(
      (sum, column) => sum + (column?.tasks?.length || 0),
      0,
    );
    const average = totalTasks / columns.length;
    return average;
  }

  async getTopColumnsByTasks(userId: number) {
    if (!userId) return [];
    const boards = await this.prisma.kanbanBoard.findMany({
      where: {
        authorId: userId,
      },
      include: {
        columns: {
          include: {
            tasks: true,
          },
        },
      },
      orderBy: {
        columns: {
          _count: 'desc',
        },
      },
      take: 3,
    });
    if (!boards) return [];
    return boards.map((board) => ({
      id: board?.id,
      title: board?.title,
      taskCount:
        board?.columns?.reduce(
          (sum, column) => sum + (column?.tasks?.length || 0),
          0,
        ) || 0,
    }));
  }

  async getTaskCreationStats(userId: number) {
    if (!userId) return {};
    const tasks = await this.prisma.kanbanTask.findMany({
      where: {
        column: {
          board: {
            authorId: userId,
          },
        },
      },
      select: {
        createdAt: true,
      },
    });
    if (!tasks || !tasks.length) return {};
    const groupedTasks = tasks.reduce(
      (acc, task) => {
        if (!task?.createdAt) return acc;
        const dateKey = task.createdAt.toISOString().split('T')[0];
        acc[dateKey] = (acc[dateKey] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    return groupedTasks;
  }

  async getUserActivity(userId: number, days: number) {
    if (!userId || !days) return { tasksCount: 0, projectsCount: 0 };
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);
    const tasksCount = await this.prisma.kanbanTask.count({
      where: {
        column: {
          board: {
            authorId: userId,
          },
        },
        createdAt: {
          gte: sinceDate,
        },
      },
    });
    const projectsCount = await this.prisma.kanbanBoard.count({
      where: {
        authorId: userId,
        createdAt: {
          gte: sinceDate,
        },
      },
    });
    return {
      tasksCount: tasksCount || 0,
      projectsCount: projectsCount || 0,
    };
  }
}
