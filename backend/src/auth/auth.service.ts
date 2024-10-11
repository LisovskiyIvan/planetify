import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs'
import { IUser } from 'src/users/users.model';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService){}

    async login(userDto: IUser){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

     async validateUser(userDto: IUser) {
        const user = await this.userService.getUserByName(userDto.username)
        console.log(user)
        const passwordEauals = await bcrypt.compare(userDto.password, user.password)
        console.log(passwordEauals)
        if(user && passwordEauals) return user
        else throw new UnauthorizedException({message: 'Неккоректные данные для входа'})
    }
    
    async register(userDto: IUser){
        if(await this.userService.getUserByName(userDto.username)) {
            return {
                token: '',
                username: '',
                id: '',
                error: 'Такой пользователь уже существует'
            }
        }

        const hashedPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({username: userDto.username, password: hashedPassword})
        return this.generateToken(user)
    }
        private async generateToken(userDto: User) {
            const payload = {username: userDto.username}
            return {
                token: this.jwtService.sign(payload, {secret: process.env.PRIVATE_KEY}),
                username: userDto.username,
                id: userDto.id.toString()
            }
        }
}
