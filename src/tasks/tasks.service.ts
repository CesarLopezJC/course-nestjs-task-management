import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { searchStatusFilterDTO } from './dto/search-status-filter.dto';
import { UpdateTaskSatusDto } from './dto/update-task-status.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }
    // private tasks: Task[] = [];

    // async getAllTasks(): Promise<Task[]> {
    //     return this.prisma.task.findMany();
    // }

    async getTaskById(id: string, user: string): Promise<Task> {
        //try to get task
        const found = await this.prisma.task.findFirst({
            where: {
                id: id,
                userId: user
            }
        });

        // if not found, throw an error (404 not found)
        if (!found) {
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }

        //otherwise return the found task
        return found;
    }

    async getFilteredTasks(filter: searchStatusFilterDTO, user: string): Promise<Task[]> {
        const { status, search } = filter;

        const tasks = await this.prisma.task.findMany({
            where: {
                status: status,
                AND: [
                    {
                        OR: [
                            {
                                description: {
                                    contains: search,
                                    mode: 'insensitive', // it allows us to match lowercase letters and uppercase letters
                                }
                            },
                            {
                                title: {
                                    contains: search,
                                    mode: 'insensitive', // it allows us to match lowercase letters and uppercase letters
                                }
                            }
                        ]
                    },
                    {
                        userId: user
                    }
                ]

            }
        });

        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        const { title, description } = createTaskDto;

        try {
            const task = await this.prisma.task.create({
                data: {
                    title,
                    description,
                    status: "OPEN",
                    userId: userId,
                }
            });

            return task;
        } catch (error) {
            throw new ConflictException("Check your token.")
        }
    }

    async deleteTask(id: string, user: string) {
        await this.getTaskById(id, user);
        await this.prisma.task.delete({
            where: {
                id: id
            }
        });
    }

    async updateTaskStatus(id: string, updateTaskSatusDto: UpdateTaskSatusDto, user: string): Promise<Task> {
        await this.getTaskById(id, user);
        const { status } = updateTaskSatusDto;

        const task = await this.prisma.task.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        });

        return task;
    }
}