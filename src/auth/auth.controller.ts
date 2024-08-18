import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from 'src/users/users.model';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/login')
    login(@Body() user: IUser){
        return this.authService.login(user)
    }

    @Post('/registration')
    registration(@Body() user: IUser){
        return this.authService.register(user)
    }
}
