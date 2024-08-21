import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "@prisma/client";
import { IsEnum } from "class-validator";


export class UpdateTaskSatusDto {
    @IsEnum(TaskStatus)
    @ApiProperty({
        example: "Status",
        description: "Status of your task",
    })
    status: TaskStatus;
}