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
  async getBoards(userId: number) {
    return await this.prisma.kanbanBoard.findMany({
      where: { authorId: userId },
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
    columnId: number,
    title: string,
    description: string,
    position: number,
  ) {
    return await this.prisma.kanbanTask.create({
      data: {
        columnId,
        title,
        description,
        position,
      },
    });
  }

  // Обновить задачу
  async updateTask(
    id: number,
    data: { title?: string; description?: string; position?: number },
  ) {
    return await this.prisma.kanbanTask.update({
      where: { id },
      data,
    });
  }

  // Удалить колонку
  async deleteColumn(id: number) {
    return await this.prisma.kanbanColumn.delete({
      where: { id },
    });
  }

  // Удалить задачу
  async deleteTask(id: number) {
    return await this.prisma.kanbanTask.delete({
      where: { id },
    });
  }
}
