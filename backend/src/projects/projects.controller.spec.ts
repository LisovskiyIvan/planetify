import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/auth.guard';
import { IPost, INewPost, IOldPost } from './projects.model';

const mockProjectsService = {
  getUserWithPostsAndProjects: jest.fn(),
  createProject: jest.fn(),
  createPost: jest.fn(),
  deleteProject: jest.fn(),
  deletePost: jest.fn(),
  updateProject: jest.fn(),
  updatePost: jest.fn(),
};

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let projectsService: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: mockProjectsService,
        },
      ],
    })
      .overrideGuard(AuthGuard) // Мокируем AuthGuard
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<ProjectsController>(ProjectsController);
    projectsService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProjectsAndPosts', () => {
    it('should call ProjectsService.getUserWithPostsAndProjects with correct userId', async () => {
      const userId = '1';
      await controller.getAllProjectsAndPosts({ userId });
      expect(projectsService.getUserWithPostsAndProjects).toHaveBeenCalledWith(
        1,
      );
    });
  });

  describe('createProject', () => {
    it('should call ProjectsService.createProject with correct userId and title', async () => {
      const body = { userId: 1, title: 'New Project' };
      await controller.createProject(body);
      expect(projectsService.createProject).toHaveBeenCalledWith(
        body.userId,
        body.title,
      );
    });
  });

  describe('createPost', () => {
    it('should call ProjectsService.createPost with correct post data', async () => {
      const post: IPost = {
        title: 'New Post',
        content: 'Post content',
        status: 'DRAFT',
        projectId: 1,
      };
      await controller.createPost(post);
      expect(projectsService.createPost).toHaveBeenCalledWith(post);
    });
  });

  describe('deleteProject', () => {
    it('should call ProjectsService.deleteProject with correct projectId', async () => {
      const params = { id: '1' };
      await controller.deleteProject(params);
      expect(projectsService.deleteProject).toHaveBeenCalledWith(1);
    });
  });

  describe('deletePost', () => {
    it('should call ProjectsService.deletePost with correct postId', async () => {
      const params = { id: '1' };
      await controller.deletePost(params);
      expect(projectsService.deletePost).toHaveBeenCalledWith(1);
    });
  });

  describe('updateProject', () => {
    it('should call ProjectsService.updateProject with correct projectId and title', async () => {
      const body = { projectId: '1', title: 'Updated Project' };
      await controller.updateProject(body);
      expect(projectsService.updateProject).toHaveBeenCalledWith(1, body.title);
    });
  });

  describe('updatePost', () => {
    it('should call ProjectsService.updatePost with correct oldPost and newPost', async () => {
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
        status: 'Не закончено',
      };
      await controller.updatePost({ oldPost, newPost });
      expect(projectsService.updatePost).toHaveBeenCalledWith(oldPost, newPost);
    });
  });
});
