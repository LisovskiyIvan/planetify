import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { INewPost, IOldPost, IPost } from './projects.model';

@Controller('projects')
export class PostsController {

    constructor(private projectsService: ProjectsService){}

    // get all project and posts
    // get all projects by user id
    // get all posts from project 
    //create project and post
    //delete project and post
    //update project and post

    @UseGuards(AuthGuard)
    @Get('/:userId')
    async getAllProjectsAndPosts(@Param() params: {userId: string}) {
        return await this.projectsService.getUserWithPostsAndProjects(parseInt(params.userId))
    }


    @UseGuards(AuthGuard)
    @Post('/create')
    async createProject(@Body() body: {userId: number, title: string}) {
        return await this.projectsService.createProject(body.userId, body.title)
    }

    @UseGuards(AuthGuard)
    @Post('/create/post')
    async createPost(@Body() post: IPost) {
        return await this.projectsService.createPost(post)
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    async deleteProject(@Param() params: {id: string}) {
        return await this.projectsService.deleteProject(parseInt(params.id))
    }

    @UseGuards(AuthGuard)
    @Delete('/post/:id')
    async deletePost(@Param() params: {id: string}) {
        return await this.projectsService.deletePost(parseInt(params.id))
    }

    @UseGuards(AuthGuard)
    @Put('/')
    async updateProject(@Body() {projectId, title}: {projectId: string, title: string}) {
        return await this.projectsService.updateProject(parseInt(projectId), title)
    }

    @UseGuards(AuthGuard)
    @Patch('/post')
    async updatePost(@Body() {oldPost, newPost}: {oldPost: IOldPost, newPost: INewPost}) {
        return await this.projectsService.updatePost(oldPost, newPost)
    }

}
