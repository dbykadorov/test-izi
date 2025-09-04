import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
	@ApiProperty({ example: 'Buy milk' })
	@IsString()
	@IsNotEmpty()
	title!: string;

	@ApiProperty({ example: false, required: false })
	@IsOptional()
	@IsBoolean()
	completed?: boolean;
}
