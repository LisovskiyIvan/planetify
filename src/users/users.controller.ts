import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './users.model';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post('/')
    create(@Body() user: IUser) {
        return this.usersService.createUser(user)
    }

    @Get('/')
    getAll() {
        return this.usersService.getUsers()
    }
}