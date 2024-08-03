import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { searchStatusFilterDTO } from './dto/search-status-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id: string) {
        return this.tasks.find(task => task.id == id);
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
        this.tasks = this.tasks.filter(task => task.id != id);
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);

        task.status = status;

        return task;


    }
}