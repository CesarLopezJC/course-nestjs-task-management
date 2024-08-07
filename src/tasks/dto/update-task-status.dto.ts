import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";


export class UpdateTaskSatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}