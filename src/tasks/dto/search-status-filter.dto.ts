import { TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
export class searchStatusFilterDTO {
    @IsOptional() @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional() @IsString()
    search?: string;
}