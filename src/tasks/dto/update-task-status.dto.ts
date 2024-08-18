import { TaskStatus } from "@prisma/client";
import { IsEnum } from "class-validator";


export class UpdateTaskSatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}