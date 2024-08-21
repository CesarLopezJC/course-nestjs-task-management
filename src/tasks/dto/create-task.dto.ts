import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'
export class CreateTaskDto {
    @IsNotEmpty()
    @ApiProperty({
        example: "Title",
        description: "Create a new rol",
    })
    title: string;

    @IsNotEmpty()
    @ApiProperty({
        example: "Description",
        description: "Create a new rol for HR with rights to manage users.",
    })
    description: string;
}