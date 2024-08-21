import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
export class searchStatusFilterDTO {
    @IsOptional()
    @IsEnum(TaskStatus)
    @ApiProperty({
        example: "Status",
        description: "OPEN",
        required: false,
    })
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: "Search",
        description: "HR",
        required: false,
    })
    search?: string;
}