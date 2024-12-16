import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from './users.model';

const mockUser: IUser = {
  username: 'testuser',
  password: 'test@test.com',
};

const mockUsersService = {
  createUser: jest.fn().mockResolvedValue(mockUser),
  getUsers: jest.fn().mockResolvedValue([mockUser]),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mockJwtToken'), // Мокируем метод sign, если он используется
  verify: jest.fn().mockReturnValue({ userId: 1 }), // Мокируем метод verify, если он используется
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService, // Правильное предоставление мока для JwtService
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call UsersService.createUser and return the created user', async () => {
      const user: IUser = {
        username: 'testuser',
        password: 'test@test.com',
      };
      const result = await controller.create(user);
      expect(service.createUser).toHaveBeenCalledWith(user);
      expect(result).toEqual(mockUser);
    });
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const result = await controller.getAll();
      expect(service.getUsers).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });
});
