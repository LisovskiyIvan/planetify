import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class StatisticService {
  constructor(
    private readonly prisma: PrismaService,
    private users: UsersService,
    private projects: ProjectsService,
  ) {}

  async getTasksData(userId: number) {
    const user = await this.users.getUserById(userId);
    if (!user) {
      return null;
    }

    const data = await this.projects.getUserWithPostsAndProjects(userId);
    if (!data) {
      return null;
    }

    const projects = data.length;
    let posts = 0;
    let high = 0;
    let medium = 0;
    let low = 0;

    for (let i = 0; i < data.length; i++) {
      if (!data[i] || !data[i].posts) continue;
      posts += data[i].posts.length;
      for (let j = 0; j < data[i].posts.length; j++) {
        if (!data[i].posts[j]) continue;

        if (data[i].posts[j].status === 'Важно') high++;
        else if (data[i].posts[j].status === 'Может подождать') medium++;
        else low++;
      }
    }

    return {
      projectsCount: (user.all_projects || 0) + data.length,
      postsCount: (user.all_posts || 0) + posts,
      currentProjects: projects,
      currentPosts: posts,
      highPriorityPosts: high,
      mediumPriorityPosts: medium,
      lowPriorityPosts: low,
    };
  }

  async getCurrentStats(userId: number) {
    const data = await this.projects.getUserWithPostsAndProjects(userId);
    const projects = data.length;
    let posts = 0;
    for (let i = 0; i < data.length; i++) {
      posts += data[i].posts.length;
    }

    return {
      currentProjects: projects,
      currentPosts: posts,
    };
  }
}
