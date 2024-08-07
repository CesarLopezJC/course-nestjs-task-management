import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { searchStatusFilterDTO } from './dto/search-status-filter.dto';
import { UpdateTaskSatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id: string) {
        //try to get task
        const found = this.tasks.find(task => task.id == id);

        // if not found, throw an error (404 not found)
        if (!found) {
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }

        //otherwise return the found task
        return found;
    }

    getFilteredTasks(filter: searchStatusFilterDTO) {
        const { status, search } = filter;
        //Temporal variable
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task => {
                return (task.description.includes(search) || task.title.includes(search))
            });
        }

        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);

        return task;
    }

    deleteTask(id: string) {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id != found.id);
    }

    updateTaskStatus(id: string, updateTaskSatusDto: UpdateTaskSatusDto) {
        const task = this.getTaskById(id);
        const { status } = updateTaskSatusDto;

        task.status = status;

        return task;
    }
}