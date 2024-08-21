import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Task, User } from '@prisma/client';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { searchStatusFilterDTO } from './dto/search-status-filter.dto';
import { UpdateTaskSatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
@ApiBearerAuth('JWT-auth')
@ApiTags('Tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    async getTasks(
        @Query() filterDto: searchStatusFilterDTO,
        @GetUser() user: User,
    ): Promise<Task[]> {
        return this.tasksService.getFilteredTasks(filterDto, user.id);
    }

    @Get('/:id')
    async getTaskById(
        @Param('id') id: string,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user.id);

    }

    @Post()
    async createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
        // @Req() req //user data
    ): Promise<Task> {
        // console.log(req.user); //user data
        return this.tasksService.createTask(createTaskDto, user.id);
    }

    @Delete('/:id')
    async deleteTask(
        @Param('id') id: string,
        @GetUser() user: User,
    ) {
        await this.tasksService.deleteTask(id, user.id);
    }

    @Patch('/:id/status')
    async updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskSatusDto: UpdateTaskSatusDto,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, updateTaskSatusDto, user.id)
    }
}
