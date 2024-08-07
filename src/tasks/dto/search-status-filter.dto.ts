import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';
export class searchStatusFilterDTO {
    @IsOptional() @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional() @IsString()
    search?: string;
}