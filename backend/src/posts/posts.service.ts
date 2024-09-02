import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IPost } from './post.model';

@Injectable()
export class PostsService {

    constructor(private readonly prisma: PrismaService){}


    async getAllPostsByUserId(id: number) {
        return await this.prisma.post.findMany({where: {author: { is: {id: {equals: id}}}}})
    }

    async createPost(post: IPost) {
        return await this.prisma.post.create({data: post})
    }
    

}
