import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
export class searchStatusFilterDTO {
    @IsOptional()
    @IsEnum(TaskStatus)
    @ApiProperty({
        example: "OPEN",
        description: "Status",
        required: false,
    })
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: "HR",
        description: "Search",
        required: false,
    })
    search?: string;
}