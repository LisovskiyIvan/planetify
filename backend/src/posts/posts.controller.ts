import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { IPost } from './post.model';

@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService){}


    @UseGuards(AuthGuard)
    @Get('/:id')
    getAll(@Param() params: {id: string}) {
        return this.postsService.getAllPostsByUserId(parseInt(params.id))
    }


    @UseGuards(AuthGuard)
    @Post('/create')
    createPost(@Body() post: IPost) {
        return this.postsService.createPost(post)
    }
    
}
