import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../prisma.service';
import { IPost, INewPost, IOldPost } from './projects.model';

const mockPrismaService = {
  project: {
    findMany: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
  post: {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
};

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserWithPostsAndProjects', () => {
    it('should call prisma.project.findMany with correct userId', async () => {
      const userId = 1;
      await service.getUserWithPostsAndProjects(userId);
      expect(prisma.project.findMany).toHaveBeenCalledWith({
        where: { authorId: userId },
        include: { posts: true },
      });
    });
  });

  describe('createProject', () => {
    it('should call prisma.project.create with correct data', async () => {
      const userId = 1;
      const title = 'Test Project';
      await service.createProject(userId, title);
      expect(prisma.project.create).toHaveBeenCalledWith({
        data: {
          title: title,
          author: {
            connect: { id: userId },
          },
        },
      });
    });
  });

  describe('createPost', () => {
    it('should call prisma.post.create with correct data', async () => {
      const post: IPost = {
        title: 'Test Post',
        content: 'Test Content',
        status: 'PUBLISHED',
        projectId: 1,
      };
      const userId = 1;
      await service.createPost(post, userId);
      expect(prisma.post.create).toHaveBeenCalledWith({
        data: {
          title: post.title,
          content: post.content,
          status: post.status,
          project: {
            connect: { id: post.projectId },
          },
        },
      });
    });
  });

  describe('deleteProject', () => {
    it('should call prisma.project.delete with correct projectId', async () => {
      const projectId = 1;
      await service.deleteProject(projectId);
      expect(prisma.project.delete).toHaveBeenCalledWith({
        where: { id: projectId },
      });
    });
  });

  describe('deletePost', () => {
    it('should call prisma.post.delete with correct postId', async () => {
      const postId = 1;
      await service.deletePost(postId);
      expect(prisma.post.delete).toHaveBeenCalledWith({
        where: { id: postId },
      });
    });
  });

  describe('updateProject', () => {
    it('should call prisma.project.update with correct projectId and title', async () => {
      const projectId = 1;
      const title = 'Updated Project Title';
      await service.updateProject(projectId, title);
      expect(prisma.project.update).toHaveBeenCalledWith({
        where: { id: projectId },
        data: { title: title },
      });
    });
  });

  describe('updatePost', () => {
    it('should call prisma.post.update with correct oldPost and newPost data', async () => {
      const oldPost: IOldPost = {
        id: 1,
        title: 'Old Post',
        content: 'Old Content',
        status: 'Не закончено',
      };
      const newPost: INewPost = {
        id: 1,
        title: 'New Post',
        content: 'New Content',
        status: 'Закончено',
      };
      await service.updatePost(oldPost, newPost);
      expect(prisma.post.update).toHaveBeenCalledWith({
        where: { id: oldPost.id },
        data: {
          title: newPost.title || oldPost.title,
          content: newPost.content || oldPost.content,
        },
      });
    });
  });
});
