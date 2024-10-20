import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('statistic')
export class StatisticController {


    constructor(private statisticService: StatisticService){}

    @UseGuards(AuthGuard)
    @Get('/current/:userId')
    async getCurrentStats(@Param() params: {userId: string}) {
        return await this.statisticService.getCurrentStats(parseInt(params.userId))
    }


    @UseGuards(AuthGuard)
    @Get('/all/:userId')
    async getAllProjectsAndPosts(@Param() params: {userId: string}) {
        return await this.statisticService.getTasksData(parseInt(params.userId))
    }
}
