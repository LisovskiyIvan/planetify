import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IUser } from './users.model';



@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaService){}

    async getUsers() {
        return await this.prisma.user.findMany()
    }

    async createUser(dto: IUser) {
        return await this.prisma.user.create({data: dto})
    }
    async getUserByName(username: string) {
        return await this.prisma.user.findUnique({where: {username}})
    }
}
