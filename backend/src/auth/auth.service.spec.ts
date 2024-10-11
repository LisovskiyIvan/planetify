import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

const mockUsersService = {
  getUserByName: jest.fn(),
  createUser: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('testToken'),
};

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should validate user and generate a token', async () => {
      const userDto = { username: 'testuser', password: 'testpass' };
      const user ={
        id: 1,
        username: 'testuser',
        password: 'hashedpass',
        paid_user: false,
        all_projects: 0,
        all_posts: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      const result = await authService.login(userDto);

      expect(authService.validateUser).toHaveBeenCalledWith(userDto);
      expect(jwtService.sign).toHaveBeenCalledWith({ username: user.username });
      expect(result).toEqual({
        token: 'testToken',
        username: user.username,
        id: user.id.toString(),
      });
    });
  });

  describe('validateUser', () => {
    it('should return user if username and password are valid', async () => {
      const userDto = { username: 'testuser', password: 'testpass' };
      const user = { id: 1, username: 'testuser', password: 'hashedpass' };

      mockUsersService.getUserByName.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await authService['validateUser'](userDto);
      expect(usersService.getUserByName).toHaveBeenCalledWith(userDto.username);
      expect(bcrypt.compare).toHaveBeenCalledWith(userDto.password, user.password);
      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if validation fails', async () => {
      const userDto = { username: 'testuser', password: 'wrongpass' };
      const user = { id: 1, username: 'testuser', password: 'hashedpass' };

      mockUsersService.getUserByName.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(authService['validateUser'](userDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should return error if user already exists', async () => {
      const userDto = { username: 'existinguser', password: 'testpass' };
      mockUsersService.getUserByName.mockResolvedValue({ id: 1, username: 'existinguser' });

      const result = await authService.register(userDto);

      expect(usersService.getUserByName).toHaveBeenCalledWith(userDto.username);
      expect(result).toEqual({
        token: '',
        username: '',
        id: '',
        error: 'Такой пользователь уже существует',
      });
    });

    it('should hash password and create user', async () => {
      const userDto = { username: 'newuser', password: 'testpass' };
      const user = { id: 1, username: 'newuser', password: 'hashedpass' };

      mockUsersService.getUserByName.mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpass');
      mockUsersService.createUser.mockResolvedValue(user);

      const result = await authService.register(userDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(userDto.password, 5);
      expect(usersService.createUser).toHaveBeenCalledWith({
        username: userDto.username,
        password: 'hashedpass',
      });
      expect(jwtService.sign).toHaveBeenCalledWith({ username: user.username });
      expect(result).toEqual({
        token: 'testToken',
        username: user.username,
        id: user.id.toString(),
      });
    });
  });
});
