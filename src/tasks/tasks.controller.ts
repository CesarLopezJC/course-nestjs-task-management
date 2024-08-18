import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { searchStatusFilterDTO } from './dto/search-status-filter.dto';
import { UpdateTaskSatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    async getTasks(@Query() filterDto: searchStatusFilterDTO): Promise<Task[]> {
        //Verify if there is a one filter
        // if (Object.keys(filterDto).length) {
        //     //...
        return this.tasksService.getFilteredTasks(filterDto);
        // } else {
        //     //Get all tasks
        //     return this.tasksService.getAllTasks();
        // }
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    async createTask(
        @Body() createTaskDto: CreateTaskDto,
        @Req() req //user data
    ): Promise<Task> {
        // console.log(req.user); //user data
        return this.tasksService.createTask(createTaskDto, req.user.id);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string) {
        await this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    async updateTaskStatus(@Param('id') id: string,
        @Body() updateTaskSatusDto: UpdateTaskSatusDto,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, updateTaskSatusDto)
    }
}
