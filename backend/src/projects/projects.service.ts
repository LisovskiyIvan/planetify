import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { INewPost, IOldPost, IPost } from './projects.model';
import { UsersService } from '../users/users.service';
@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private users: UsersService,
  ) {}

  async getUserWithPostsAndProjects(userId: number) {
    return await this.prisma.project.findMany({
      where: {
        authorId: userId,
      },
      include: {
        posts: true,
      },
    });
  }

  async createProject(userId: number, title: string) {
    this.users.updateProjects(userId);
    return await this.prisma.project.create({
      data: {
        title: title,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async createPost(post: IPost, userId: number) {
    this.users.updatePosts(userId);
    return await this.prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        status: post.status,
        project: {
          connect: {
            id: post.projectId,
          },
        },
      },
    });
  }

  async deleteProject(projectId: number) {
    return await this.prisma.project.delete({
      where: {
        id: projectId,
      },
    });
  }

  async deletePost(postId: number) {
    return await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }

  async updateProject(projectId: number, title: string) {
    return await this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        title: title,
      },
    });
  }

  // еще надо передавать старый пост или найти способ делать патч а не пут
  async updatePost(oldPost: IOldPost, newPost: INewPost) {
    return this.prisma.post.update({
      where: {
        id: oldPost.id,
      },
      data: {
        title: newPost.title || oldPost.title,
        content: newPost.content || oldPost.content,
        status: newPost.status || oldPost.status,
      },
    });
  }
  // async getAllPostsByUserId(id: number) {
  //     return await this.prisma.post.findMany({where: {author: { is: {id: {equals: id}}}}})
  // }

  // async createPost(post: IPost) {
  //     return await this.prisma.post.create({data: post})
  // }
}
