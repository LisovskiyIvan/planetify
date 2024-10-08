import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './users.model';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('/')
    create(@Body() user: IUser) {
        return this.usersService.createUser(user)
    }

    @UseGuards(AuthGuard)
    @Get('/')
    getAll() {
        return this.usersService.getUsers()
    }
}