import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IUser } from '../users/users.model';

const mockAuthService = {
  login: jest.fn(),
  register: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should call AuthService.login and return a token', async () => {
      const user: IUser = { username: 'testuser', password: 'testpass' };
      const mockTokenResponse = { token: 'testToken', username: 'testuser', id: '1' };

      mockAuthService.login.mockResolvedValue(mockTokenResponse);

      const result = await authController.login(user);

      expect(authService.login).toHaveBeenCalledWith(user);
      expect(result).toEqual(mockTokenResponse);
    });
  });

  describe('registration', () => {
    it('should call AuthService.register and return a token', async () => {
      const user: IUser = { username: 'newuser', password: 'testpass' };
      const mockRegisterResponse = { token: 'testToken', username: 'newuser', id: '2' };

      mockAuthService.register.mockResolvedValue(mockRegisterResponse);

      const result = await authController.registration(user);

      expect(authService.register).toHaveBeenCalledWith(user);
      expect(result).toEqual(mockRegisterResponse);
    });
  });
});
