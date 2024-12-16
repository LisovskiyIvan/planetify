import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IUser } from './users.model';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async createUser(dto: IUser) {
    return await this.prisma.user.create({ data: dto });
  }
  async getUserByName(username: string) {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  async getUserById(id: number) {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  async updateProjects(userId: number) {
    const user = await this.getUserById(userId);
    return await this.prisma.user.update({
      where: { id: user.id },
      data: { all_projects: user.all_projects + 1 },
    });
  }

  async updatePosts(userId: number) {
    const user = await this.getUserById(userId);
    return await this.prisma.user.update({
      where: { id: user.id },
      data: { all_posts: user.all_posts + 1 },
    });
  }
}
