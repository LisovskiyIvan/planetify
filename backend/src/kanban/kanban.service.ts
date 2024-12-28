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
}
